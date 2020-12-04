import { AflegStapel, HandStapel, PatienceStapel, TrekStapel } from '../stapels';

import { Card } from '../cards/card';
import Phaser from 'phaser';
import { TextButton } from '../button';
import { BasicAI } from '../ai';

const suits = ['C', 'D', 'H', 'S'];
export default class Game extends Phaser.Scene {
	constructor () {
		super('game'); // id of Scene

		this.ai = null;
	}

	preload () {
		// this.load.setBaseURL('http://labs.phaser.io'); // Files are now hosted locally
		this.load.image('cardback', 'assets/PNG/Cards/cardBack_green3.png');
		this.load.atlasXML('playingCards', 'assets/Spritesheets/playingCards.png', 'assets/Spritesheets/playingCards.xml');
	}

	create () {
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };

		const trekStapels = [
			new TrekStapel(this, screenCenter.x - 450, screenCenter.y),
			new TrekStapel(this, screenCenter.x + 450, screenCenter.y),
		];

		// Add cards to the trekstapel
		for (const suit of suits) {
			for (let value = 1; value <= 13; value++) {
				trekStapels[0].addCard(new Card(this, 0, 0, value, suit));
				// trekStapels[0].addCard(new Card(this, 0, 0, 1, suit));
			}
		}

		// Shuffle the trekstapel
		trekStapels[0].shuffle();

		// Split the cards in the trekstapel
		for (let i = 0; i < 26; i++) {
			trekStapels[1].addCard(trekStapels[0].popCard());
		}

		// Shuffle these stapels again
		for (const trekStapel of trekStapels) {
			trekStapel.shuffle();
		}

		this.patienceStapelsPlayer = makePatienceStapels(this, screenCenter.x, screenCenter.y + 150, false);
		this.patienceStapelsAI = makePatienceStapels(this, screenCenter.x, screenCenter.y - 150, true);
		var aflegStapels = [];
		this.handstapelPlayer = new HandStapel(this, screenCenter.x, screenCenter.y + 450, false);
		this.handstapelAI = new HandStapel(this, screenCenter.x, screenCenter.y - 300, true);

		for (let i = 0; i < 2; i++) {
			aflegStapels.push(new AflegStapel(this, screenCenter.x - 150 + 300 * i, screenCenter.y));
		}

		// // Add some cards to the aflegstapel
		// for (let i = 0; i < aflegStapels.length; i++) {
		// 	const stapel = aflegStapels[i];
		// 	const playerCard = new Card(this, 0, 0, 4, 'C');
		// 	playerCard.disableInteractive();
		// 	stapel.addCard(playerCard);
		// }

		trekStapels[1].on('pointerdown', () => {
			// TODO: Check if the trekstapel has cards
			for (let i = 0; i < 2; i++) {
				const card = trekStapels[i].popCard();

				if (card) {
					aflegStapels[i].addCard(card);
				}
			}
		});

		for (let i = 0; i < 2; i++) {
			aflegStapels[i].on('pointerdown', () => {
				pushAflegStapel(this, aflegStapels, i, trekStapels, false);
			});
		}

		// Buttons
		this.fullscreen = new TextButton(this, this.cameras.main.width - 110, 50, 160, 50, 'Fullscreen', 20, 0, undefined, undefined, () => this.scale.toggleFullscreen());
		this.pause = new TextButton(this, this.cameras.main.width - 110, 125, 160, 50, 'Pause', 20, 0, undefined, undefined, () => this.scene.switch('pauseMenu'));
		this.stop = new TextButton(this, this.cameras.main.width - 110, 200, 160, 50, 'Stop', 20, 0, undefined, undefined, () => this.scene.start('gameEnd'));
		this.deal = new TextButton(this, screenCenter.x, screenCenter.y, 200, 75, 'Delen', 35, 4, undefined, undefined, () => {
			dealCards(this.patienceStapelsPlayer, trekStapels[1], this);
			dealCards(this.patienceStapelsAI, trekStapels[0], this, true);
			this.deal.setVisible(false);
		});

		// AI
		this.ai = new BasicAI(
			this.patienceStapelsAI, this.handstapelAI,
			this.patienceStapelsPlayer, HandStapel,
			aflegStapels, trekStapels,
		);
	}

	update (time, delta) {
		this.ai.update(time, delta);
	}

	checkStapels () {
		if (countCards(this.patienceStapelsPlayer) <= 3) {
			moveAllTo(this.patienceStapelsPlayer, this.handstapelPlayer);
			for (const stapel of this.patienceStapelsPlayer) {
				stapel.disableStapel();
			}
		}
	}
}

function countCards (stapels) {
	var aantal = 0;
	console.log('stapelscount:', stapels);
	for (const stapel of stapels) {
		aantal += stapel.getSize();
	}
	return aantal;
}

function moveAllTo (sourceStapels, targetStapel) {
	for (const stapel of sourceStapels) {
		var card = stapel.popCard();
		while (card) {
			card.angle = 0;
			targetStapel.addCard(card);
			card = stapel.popCard();
		}
	}
}

function pushAflegStapel (scene, aflegStapels, i, trekStapels, AI) {
	const j = (i === 0) ? 1 : 0;
	if (!AI) {
		const aantal = countCards(scene.patienceStapelsPlayer) + countCards([scene.handstapelPlayer]);
		if (aantal === 0) {
			if (aflegStapels[i].getSize() === 0) {
				scene.scene.start('gameEnd');
			} else {
				moveAllTo([aflegStapels[i]], trekStapels[1]);
				moveAllTo([aflegStapels[j]], trekStapels[0]);
				moveAllTo(scene.patienceStapelsPlayer, trekStapels[1]);
				moveAllTo(scene.patienceStapelsAI, trekStapels[0]);
				scene.deal.setVisible(true);
			}
		}
	} else {
		const aantal = countCards(scene.patienceStapelsAI) + countCards([scene.handstapelPlayer]);
		if (aantal === 0) {
			if (aflegStapels[i].getSize() === 0) {
				scene.scene.start('gameEnd');
			} else {
				moveAllTo([aflegStapels[i]], trekStapels[0]);
				moveAllTo([aflegStapels[j]], trekStapels[1]);
				moveAllTo(scene.patienceStapelsPlayer, trekStapels[1]);
				moveAllTo(scene.patienceStapelsAI, trekStapels[0]);
				scene.deal.setVisible(true);
			}
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

function dealCards (patienceStapels, trekstapel, scene, AI = false) {
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
