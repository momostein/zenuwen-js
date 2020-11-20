import { AflegStapel } from '../stapels/afleg_stapel';
import { Card } from '../cards/card';
import { PatienceStapel } from '../stapels/patience_stapel';
import Phaser from 'phaser';
import { TextButton } from '../button';
import { TrekStapel } from '../stapels/trek_stapel';
import { style } from '../style';

const suits = ['C', 'D', 'H', 'S'];
export default class Game extends Phaser.Scene {
	constructor () {
		super('game'); // id of Scene
	}

	preload () {
		// this.load.setBaseURL('http://labs.phaser.io'); // Files are now hosted locally
		this.load.image('cardback', 'assets/PNG/Cards/cardBack_green3.png');
		this.load.atlasXML('playingCards', 'assets/Spritesheets/playingCards.png', 'assets/Spritesheets/playingCards.xml');
	}

	create () {
		const self = this;
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2; // x for auto center
		const trekStapels = [
			new TrekStapel(this, screenCenterX - 300, 400),
			new TrekStapel(this, screenCenterX + 300, 400),
		];

		// Add cards to the trekstapel
		for (const suit of suits) {
			for (let value = 1; value <= 13; value++) {
				trekStapels[0].addCard(new Card(this, 0, 0, value, suit));
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

		var patiencestapels = [];
		var aflegStapels = [];

		for (let i = 0; i < 5; i++) {
			patiencestapels.push(new PatienceStapel(this, screenCenterX - 300 + 150 * i, 500));
		}

		for (let i = 0; i < 2; i++) {
			aflegStapels.push(new AflegStapel(this, screenCenterX - 100 + 200 * i, 400));
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

		/*
		 * Deal cards button
		 */

		function dealCards () {
			for (let i = 0; i < 5; i++) {
				const stapel = patiencestapels[i];
				for (let j = 4 - i; j < 5; j++) {
					const playerCard = trekStapels[1].popCard();

					if (playerCard) {
						playerCard.disableInteractive().close();

						stapel.addCard(playerCard);
					} else {
						break;
					}
				}
			}

			for (const stapel of patiencestapels) {
				stapel.openTop();
			}
		}

		this.pause = new TextButton(this, 1850, 50, 100, 50, 'Pause', 20, undefined, undefined, () => this.scene.switch('pauseMenu'));
		this.stop = new TextButton(this, 1850, 125, 100, 50, 'Stop', 20, undefined, undefined, () => this.scene.start('gameEnd'));
		this.stop = new TextButton(this, 450, 545, 165, 65, 'Deal Cards', 20, undefined, undefined, () => dealCards());
	}
}
