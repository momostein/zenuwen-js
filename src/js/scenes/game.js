import Phaser from 'phaser';
import { Card } from '../card';
import { Stapel } from '../stapel';

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

		this.stapel = new Stapel(this, 300, 200, 150, 220);
		this.stapel1 = new Stapel(this, 500, 200, 150, 220);

		/*
		 * Deal cards button
		 */

		this.dealCards = () => {
			for (let i = 0; i < 5; i++) {
				const playerCard = new Card(this, 300 + (i * 100), 600, i + 1, 'C');
			}
		};

		this.dealText = this.add.text(75, 350, ['Add 5 cards']).setFontSize(20).setColor('#030303').setInteractive();
		this.dealText.setFontFamily('sans-serif');

		this.dealText.on('pointerdown', function () {
			self.dealCards();
		});

		this.dealText.on('pointerover', function () {
			self.dealText.setColor('#FF0000');
		});

		this.dealText.on('pointerout', function () {
			self.dealText.setColor('#030303');
		});
	}
}
