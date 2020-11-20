import Phaser from 'phaser';
import { Card } from '../card';
import { PatienceStapel } from '../patience_stapel';
import { AflegStapel } from '../afleg_stapel';
import { TrekStapel } from '../trek_stapel';
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

		const trekStapels = [
			new TrekStapel(this, 400, 400),
			new TrekStapel(this, 1000, 400),
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
			patiencestapels.push(new PatienceStapel(this, 380 + 160 * i, 500));
		}

		for (let i = 0; i < 2; i++) {
			aflegStapels.push(new AflegStapel(this, 600 + 200 * i, 400));
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

					playerCard.disableInteractive().close();

					stapel.addCard(playerCard);
				}
			}

			for (const stapel of patiencestapels) {
				stapel.openTop();
			}
		}

		this.dealText = this.add.text(75, 350, ['Deal Cards']).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.dealText.setFontFamily('sans-serif');

		this.dealText.on('pointerdown', dealCards);

		this.dealText.on('pointerover', function () {
			self.dealText.setColor(style.colors.textHover.rgba);
		});

		this.dealText.on('pointerout', function () {
			self.dealText.setColor(style.colors.textColor.rgba);
		});

		/*
		 * Stop button
		 */

		this.stopText = this.add.text(1500, 350, ['Stop']).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.stopText.setFontFamily('sans-serif');

		this.stopText.on('pointerdown', function () {
			this.scene.start('gameEnd');
		}, this);

		this.stopText.on('pointerover', function () {
			self.stopText.setColor(style.colors.textHover.rgba);
		});

		this.stopText.on('pointerout', function () {
			self.stopText.setColor(style.colors.textColor.rgba);
		});

		/*
		 * Pause button
		 */

		this.pauseText = this.add.text(1500, 370, ['Pause']).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.pauseText.setFontFamily('sans-serif');

		this.pauseText.on('pointerdown', function () {
			this.scene.switch('pauseMenu');
		}, this);

		this.pauseText.on('pointerover', function () {
			self.pauseText.setColor(style.colors.textHover.rgba);
		});

		this.pauseText.on('pointerout', function () {
			self.pauseText.setColor(style.colors.textColor.rgba);
		});
	}
}
