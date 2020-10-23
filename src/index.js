import Phaser from 'phaser';
import { Card } from './js/card.js';
import { Stapel } from './js/stapel.js';
import { helloWorld } from './js/hello_world';
import Scenes from './js/scenes';

const config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 800,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	// scene: {
	// 	preload,
	// 	create,
	// },
	scene: Scenes,
};

const game = new Phaser.Game(config);

// function preload () {
// 	// this.load.setBaseURL('http://labs.phaser.io'); // Files are now hosted locally

// 	this.load.image('sky', 'assets/phaser-example/skies/space3.png');
// 	this.load.image('logo', 'assets/phaser-example/sprites/phaser3-logo.png');
// 	this.load.image('red', 'assets/phaser-example/particles/red.png');
// 	this.load.atlasXML('playingCards', 'assets/Spritesheets/playingCards.png', 'assets/Spritesheets/playingCards.xml');
// }

function create () {
	const self = this;

	this.stapel = new Stapel(this, 300, 200, 150, 220);
	this.stapel1 = new Stapel(this, 500, 200, 150, 220);

	this.dealCards = () => {
		for (let i = 0; i < 5; i++) {
			const playercard = new Card(this, 300 + (i * 100), 600, 'cardback');
		}
	};

	this.dealText = this.add.text(75, 350, ['Show 5 cards']).setFontSize(20).setColor('#FFFFFF').setInteractive();

	this.dealText.on('pointerdown', function () {
		self.dealCards();
	});

	this.dealText.on('pointerover', function () {
		self.dealText.setColor('#FF0000');
	});

	this.dealText.on('pointerout', function () {
		self.dealText.setColor('#FFFFFF');
	});

	this.input.on('dragstart', function (pointer, gameObject) {
		self.children.bringToTop(gameObject);
	});

	this.input.on('dragend', function (pointer, gameObject, dropped) {
		if (!dropped) {
			gameObject.x = gameObject.input.dragStartX;
			gameObject.y = gameObject.input.dragStartY;
		}
	});

	this.input.on('drag', function (pointer, gameObject, dragx, dragy) {
		gameObject.x = dragx;
		gameObject.y = dragy;
	});

	this.input.on('drop', function (pointer, card, stapel) {
		if (stapel.containsCard(card)) {
			card.x = card.input.dragStartX;
			card.y = card.input.dragStartY;
		} else {
			if (card.getStapel() !== undefined) {
				card.getStapel().popCard();
			}
			stapel.addCard(card);
			card.setStapel(stapel);
			card.x = (stapel.x);
			card.y = (stapel.y);
			console.log('source: ', card.getStapel());
			console.log('destination: ', stapel);
		}
	});
}
