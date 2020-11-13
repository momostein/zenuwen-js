import Phaser from 'phaser';
import { Card } from '../card';
import { AflegStapel } from '../stapels';
import { Stapel } from '../stapel';
import { PatienceStapel } from '../patience_stapel';
import { style } from '../style';
import { TextButton } from '../button';
export default class Game extends Phaser.Scene {
	constructor () {
		super('game'); // id of Scene
	}

	preload () {
		// this.load.setBaseURL('http://labs.phaser.io'); // Files are now hosted locally
		this.load.image('cardback', 'assets/PNG/Cards/cardBack_green3.png');
		this.load.atlasXML('playingCards', 'assets/Spritesheets/playingCards.png', 'assets/Spritesheets/playingCards.xml');
		this.load.image('stop', './assets/Menu/stop.png');
		this.load.image('pause', './assets/Menu/pause.png');
	}

	create () {
		const self = this;
		var stapels = [];

		for (let i = 0; i < 5; i++) {
			stapels.push(new PatienceStapel(this, 250 + 160 * i, 300, 150, 220));
		}
		/*
		 * Deal cards button
		 */

		this.dealCards = () => {
			for (let i = 0; i < 5; i++) {
				const stapel = stapels[i];
				for (let j = 4 - i; j < 5; j++) {
					const playerCard = new Card(this, 300 + (j * 100), 600, j + 1, 'C');
					playerCard.disableInteractive().close();
					stapel.addCard(playerCard);
				}
			}

			for (const stapel of stapels) {
				stapel.openTop();
			}
		};

		this.dealText = this.add.text(40, 260, 'Add 5 cards', { fontFamily: 'lemonMilk' }).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.pause = new TextButton(this, 1120, 50, 100, 50, 'Pause', 20, undefined, undefined, () => this.scene.start('pauseMenu'));
		this.stop = new TextButton(this, 1120, 125, 100, 50, 'Stop', 20, undefined, undefined, () => this.scene.start('gameEnd'));
		this.dealText.on('pointerdown', function () {
			self.dealCards();
		});

		this.dealText.on('pointerover', function () {
			self.dealText.setColor(style.colors.textHover.rgba);
		});

		this.dealText.on('pointerout', function () {
			self.dealText.setColor(style.colors.textColor.rgba);
		});
	}
}
