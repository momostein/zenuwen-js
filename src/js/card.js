import Phaser from 'phaser';

import getCardFrame from './card_frames';

export class Card extends Phaser.GameObjects.Image {
	constructor (scene, x, y, value = -1, suit) {
		super(scene, x, y);
		this.stapel = undefined;
		this.setTexture('playingCards', getCardFrame(value, suit));
		this.setScale(1, 1);
		this.setInteractive();
		scene.add.displayList.add(this);
		scene.input.setDraggable(this);

		// Set card values
		this.value = value;
		this.suit = suit;
		this.faceUp = true;
	}

	setStapel (stapel) {
		this.stapel = stapel;
	}

	getStapel () {
		return this.stapel;
	}

	close () {
		// Switch texture to the card back
		this.faceUp = false;
		this.setTexture('cardback');
	}

	open () {
		// Switch texture back to the card
		this.faceUp = true;
		this.setTexture('playingCards', getCardFrame(this.value, this.suit));
	}
}
