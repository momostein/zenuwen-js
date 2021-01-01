import {
	AflegStapel,
	HandStapel,
	PatienceStapel,
	TrekStapel,
} from '../stapels';

import { BasicAI } from '../ai';
import { Card } from '../cards/card';
import Phaser from 'phaser';
import { TextButton } from '../button';
import { preloadAudio, playDealSound, playCardAudio, playSlapSound } from '../audio';

const debugTag = 'GAME:';

// Standard deck
const suits = ['C', 'D', 'H', 'S'];
const maxCardValue = 13;

// Small deck for debug purposes
// const suits = ['C', 'D', 'H'];
// const maxCardValue = 11;

const spamPenalty = 2500; // Spam penalty in ms

export default class Game extends Phaser.Scene {
	constructor () {
		super('game');
		this.ai = null;
	}

	preload () {
		// this.load.setBaseURL('http://labs.phaser.io'); // Files are now hosted locally
		this.load.image('cardback', 'assets/Cards/cardBack_green3.png');
		this.load.atlasXML(
			'playingCards',
			'assets/Spritesheets/playingCards.png',
			'assets/Spritesheets/playingCards.xml',
		);

		preloadAudio(this);
	}

	create () {
		this.playing = false;
		this.numberOfRounds = 0;
		this.start = this.getTime();
		this.elapsed = 0;

		// Anti-stapelspam counter
		this.spamPenalty = spamPenalty;
		this.spammedTime = 0;
		this.resetSpam = false;
		this.spammed = false;

		const screenCenter = this.game.config.screenCenter;

		console.log(debugTag, 'Screencenter', screenCenter);

		this.trekStapels = [
			new TrekStapel(this, screenCenter.x - 450, screenCenter.y).disableInteractive(),
			new TrekStapel(this, screenCenter.x + 450, screenCenter.y).disableInteractive(),
		];

		// Add cards to the trekstapel
		for (const suit of suits) {
			for (let value = 1; value <= maxCardValue; value++) {
				this.trekStapels[0].addCard(new Card(this, 0, 0, value, suit));
				// this.trekStapels[0].addCard(new Card(this, 0, 0, 1, suit));
			}
		}

		// Shuffle the trekstapel
		this.trekStapels[0].shuffle();

		const totalCards = this.trekStapels[0].cards.length;

		// Split the cards in the trekstapel
		for (let i = 0; i < totalCards / 2; i++) {
			this.trekStapels[1].addCard(this.trekStapels[0].popCard());
		}

		// Shuffle these stapels again
		for (const trekStapel of this.trekStapels) {
			trekStapel.shuffle();
		}

		this.patienceStapelsPlayer = makePatienceStapels(this, screenCenter.x, screenCenter.y + 150, false);
		this.patienceStapelsAI = makePatienceStapels(this, screenCenter.x, screenCenter.y - 150, true);
		this.aflegStapels = [];

		this.handstapelPlayer = new HandStapel(this, screenCenter.x, screenCenter.y + 310, false);
		this.handstapelAI = new HandStapel(this, screenCenter.x, screenCenter.y - 370, true);

		for (let i = 0; i < 2; i++) {
			this.aflegStapels.push(
				new AflegStapel(this, screenCenter.x - 150 + 300 * i, screenCenter.y).disableInteractive(),
			);
		}

		// // Add some cards to the aflegstapel
		// for (let i = 0; i < this.aflegStapels.length; i++) {
		// 	const stapel = this.aflegStapels[i];
		// 	const playerCard = new Card(this, 0, 0, 4, 'C');
		// 	playerCard.disableInteractive();
		// 	stapel.addCard(playerCard);
		// }

		this.trekStapels[1].on('pointerdown', () => {
			// TODO: Check if the trekstapel has cards
			if (this.ai.idle) {
				// Check first if both stapels are empty
				let total = 0;
				for (const trekStapel of this.trekStapels) {
					total += trekStapel.cards.length;
				}

				// If the trekstaples are empty, reshuffle them into the trekstapels
				if (total === 0) {
					// Re shuffle the aflegstapels
					for (let i = 0; i < this.trekStapels.length; i++) {
						// Move all cards to trekstapel
						let card = this.aflegStapels[i].popCard();
						while (card) {
							this.trekStapels[i].addCard(card);
							card = this.aflegStapels[i].popCard();
						}

						// Shuffle the trekstapels
						this.trekStapels[i].shuffle();
					}
				}

				// Draw top cards
				for (let i = 0; i < this.trekStapels.length; i++) {
					const card = this.trekStapels[i].popCard();

					if (card) {
						this.aflegStapels[i].addCard(card);
					}
					if (this.aflegStapels[i].getSize() > 0) {
						this.aflegStapels[i].setShowBorder(false);
					} else {
						this.aflegStapels[i].setShowBorder(true);
					}
				}

				// Reset AI timers so the AI doesn't move instantly
				this.ai.resetTimers();

				// Play placeCard sound
				playCardAudio();
			}
		});

		// AI
		this.ai = new BasicAI(
			this.patienceStapelsAI, this.handstapelAI,
			this.patienceStapelsPlayer, this.handstapelPlayer,
			this.aflegStapels, this.trekStapels,
			this.game.config.difficulty,
		);

		for (let i = 0; i < this.aflegStapels.length; i++) {
			this.aflegStapels[i].on('pointerdown', () => {
				if (!this.spammed) {
					// Set spammed op true
					this.spammed = true;

					pushAflegStapel(this, i, false);
				} else {
					console.log(debugTag, "Please don't spam the aflegstapels!");
				}
			});
		}

		// Buttons
		this.pause = new TextButton(this, this.cameras.main.width - 80, 55, 100, 50, 'Pauze', 20, 0, undefined, undefined, () => this.scene.switch('pauseMenu'));
		this.deal = new TextButton(this, screenCenter.x, screenCenter.y, 200, 75, 'Delen', 35, 4, undefined, undefined, () => {
			dealCards(this.patienceStapelsPlayer, this.trekStapels[1], this.aflegStapels, this);
			dealCards(this.patienceStapelsAI, this.trekStapels[0], this.aflegStapels, this, true);
			this.aflegStapels.forEach(stapel => stapel.setInteractive(undefined, undefined, true));
			this.trekStapels[1].setInteractive(undefined, undefined, true);
			this.deal.setVisible(false);
			this.playing = true;

			// Reset AI, just in case
			this.ai.resetTimers();
			this.ai.resetSlap();

			// Reset spam timer, just in case
			this.spammed = false;

			// Play deal sound
			playDealSound();
		});
	}

	getTime () {
		// make a new date object
		const d = new Date();

		// return the number of milliseconds since 1 January 1970 00:00:00.
		return d.getTime();
	}

	update (time, delta) {
		if (this.playing) {
			// If ai.update returns true, slap an aflegstapel
			if (this.ai.update(time, delta)) {
				// TODO: let AI determine which stapel to slap

				// For now, we just slap the smallest stapel
				let smallestIndex = 0;
				if (this.aflegStapels[0].cards.length > this.aflegStapels[1].cards.length) {
					smallestIndex = 1;
				}

				// Slap aflegstapel
				pushAflegStapel(this, smallestIndex, true);
			}

			// Change aflegstapel border if AI is idle and game is started.
			this.trekStapels[1].setClickable(this.ai.idle);
		}

		// Anti spam logic
		if (this.spammed) {
			if (!this.resetSpam) {
				// Reset timer if it's the first one
				this.spammedTime = time;
				this.resetSpam = true;
			}

			if (time - this.spammedTime > this.spamPenalty) {
				// Reset everything after timer is finished
				this.spammed = false;
				this.resetSpam = false;
			}
		} else {
			// With this we can reset spawn timer by just setting this.spammed to false
			this.resetSpam = false;
		}
	}

	// Gets called by card when it has moved some cards
	checkStapels () {
		// Check if we have to move the player's cards to their hand
		if (countCards(this.patienceStapelsPlayer) <= 3) {
			moveAllTo(this.patienceStapelsPlayer, this.handstapelPlayer);
			for (const stapel of this.patienceStapelsPlayer) {
				stapel.disableStapel();
			}
		}

		// Make the AI reCheck his available moves
		this.ai.reCheckMoves();
	}
}

function countCards (stapels) {
	let aantal = 0;
	for (const stapel of stapels) {
		aantal += stapel.getSize();
	}
	return aantal;
}

function moveAllTo (sourceStapels, targetStapel) {
	for (const stapel of sourceStapels) {
		let card = stapel.popCard();
		while (card) {
			card.angle = 0;
			card.setScale(1);
			targetStapel.addCard(card);
			card = stapel.popCard();
		}
	}
}

function pushAflegStapel (scene, stapelIndex, clickedByAI) {
	const j = stapelIndex === 0 ? 1 : 0;

	const numCardsPlayer =
			countCards(scene.patienceStapelsPlayer) +
			countCards([scene.handstapelPlayer]);

	const numCardsAI =
			countCards(scene.patienceStapelsAI) +
			countCards([scene.handstapelAI]);

	console.debug(debugTag, 'Number of cards:', numCardsAI, numCardsPlayer);
	if (numCardsPlayer === 0 || numCardsAI === 0) {
		// Cancel all moves being made by AI
		scene.ai.cancelAllMoves();
		scene.ai.resetTimers();

		scene.playing = false;
		scene.trekStapels[1].setClickable(false);

		let gameEnd = false;

		if (!clickedByAI) {
			// Player is first
			console.log(debugTag, 'Player slapped stapel', stapelIndex);

			// Check if the game should end
			if (scene.aflegStapels[stapelIndex].getSize() + scene.trekStapels[1].getSize() === 0) {
				// End game
				gameEnd = true;

				scene.numberOfRounds++;
				scene.elapsed = Math.floor((scene.getTime() - scene.start) / 1000);
				scene.scene.start('gameEnd', { winner: 'player', rounds: scene.numberOfRounds, timeS: scene.elapsed }); // player wins
			} else {
				// Move all cards back to the trekstapels
				moveAllTo([scene.aflegStapels[stapelIndex]], scene.trekStapels[1]);
				moveAllTo([scene.aflegStapels[j]], scene.trekStapels[0]);
				moveAllTo([scene.handstapelAI], scene.trekStapels[0]);
				moveAllTo([scene.handstapelPlayer], scene.trekStapels[1]);
				moveAllTo(scene.patienceStapelsPlayer, scene.trekStapels[1]);
				moveAllTo(scene.patienceStapelsAI, scene.trekStapels[0]);

				scene.numberOfRounds++;
				scene.deal.setVisible(true);
				scene.aflegStapels.forEach(stapel => stapel.disableInteractive());
				scene.trekStapels[1].disableInteractive();
				for (const aflegStapel of scene.aflegStapels) {
					aflegStapel.setShowBorder(false);
				}
				for (const trekStapel of scene.trekStapels) {
					trekStapel.shuffle();
				}

				// Hide borders of all patiencestapels
				hidePatienceborders(scene);
			}
		} else {
			// Ai is first
			console.log(debugTag, 'AI slapped stapel', stapelIndex);

			// Check if the game should end
			if (scene.aflegStapels[stapelIndex].getSize() + scene.trekStapels[0].getSize() === 0) {
				// End game
				gameEnd = true;

				scene.numberOfRounds++;
				scene.elapsed = Math.floor((scene.getTime() - scene.start) / 1000);
				scene.scene.start('gameEnd', { winner: 'ai', rounds: scene.numberOfRounds, timeS: scene.elapsed }); // Ai wins
			} else {
				// Move all cards back to the trekstapels
				moveAllTo([scene.aflegStapels[stapelIndex]], scene.trekStapels[0]);
				moveAllTo([scene.aflegStapels[j]], scene.trekStapels[1]);
				moveAllTo(scene.patienceStapelsPlayer, scene.trekStapels[1]);
				moveAllTo(scene.patienceStapelsAI, scene.trekStapels[0]);
				moveAllTo([scene.handstapelPlayer], scene.trekStapels[1]);
				moveAllTo([scene.handstapelAI], scene.trekStapels[0]);
				scene.numberOfRounds++;

				scene.deal.setVisible(true);
				scene.aflegStapels.forEach(stapel => stapel.disableInteractive());
				scene.trekStapels[1].disableInteractive();
				for (const aflegStapel of scene.aflegStapels) {
					aflegStapel.setShowBorder(false);
				}
				for (const trekStapel of scene.trekStapels) {
					trekStapel.shuffle();
				}

				// Hide borders of all patiencestapels
				hidePatienceborders(scene);
			}
		}

		if (!gameEnd) {
			// Play slap sound if the game hasn't ended yet
			playSlapSound();
		} else {
			// For now, also play slap sound if the game has ended
			playSlapSound();
		}
	}
}

function makePatienceStapels (scene, centerX, y, AI) {
	const stapels = [];
	for (let i = 0; i < 5; i++) {
		stapels.push(new PatienceStapel(scene, centerX - 400 + 200 * i, y, AI));
	}
	return stapels;
}

function dealCards (patienceStapels, trekstapel, aflegStapels, scene, AI = false) {
	for (let i = 0; i < 5; i++) {
		for (let j = i; j < 5; j++) {
			const stapel = AI ? patienceStapels[4 - j] : patienceStapels[j];
			const playerCard = trekstapel.popCard();

			if (playerCard) {
				playerCard.disableInteractive().close();

				stapel.addCard(playerCard);
			} else {
				break;
			}
		}
	}
	scene.checkStapels();

	for (const stapel of patienceStapels) {
		stapel.enableStapel();
		stapel.openTop();
	}
}

// Hide borders of all patiencestapels
function hidePatienceborders (scene) {
	for (const stapel of scene.patienceStapelsPlayer) {
		stapel.disableStapel();
	}
	for (const stapel of scene.patienceStapelsAI) {
		stapel.disableStapel();
	}
}
