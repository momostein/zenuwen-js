import Phaser from 'phaser';

import getCardFrame from './card_frames';
const cardDist = 35;

export class Card extends Phaser.GameObjects.Image {
	constructor (scene, x, y, value = -1, suit) {
		super(scene, x, y);
		this.stapel = undefined;
		this.setTexture('playingCards', getCardFrame(value, suit));
		this.setScale(1, 1);
		this.stapel_pos = undefined;
		this.setInteractive()
			.on('dragstart', function (pointer) {
				// The pile wile do something if the card is on a pile
				// If the card is not on a pile bring te card to top
				if (this.getStapel()) {
					this.getStapel().dragCardsStart(this);
				} else {
					this.bringCardToTop();
				}
			})
			.on('dragend', function (pointer, x, y, dropped) {
				// if the card is not dropped on a pile place the card(s) back on the pile
				// The pile will do that if the card is on a pile
				if (!dropped) {
					if (this.getStapel()) {
						this.getStapel().dragCardsEnd(this);
					} else {
						this.setPosition(this.input.dragStartX, this.input.dragStartY);
					}
				}
			})
			.on('drag', function (pointer, dragX, dragY) {
				// Card(s) follow the mouse
				// The pile will do that if the card is on a pile
				if (this.getStapel()) {
					this.getStapel().dragCards(this, dragX, dragY);
				} else {
					this.setPosition(dragX, dragY);
				}
			})
			.on('drop', function (pointer, stapel) {
				// The drag ends when dropped so it leaves also
				stapel.dragLeave();
				// stapel.border.setStrokeStyle(5, colorStapelBorderIdle, 1);

				// check if cards can placed on pile
				if (stapel.checkCard(this)) {
					// place the card(s) on the new pile
					if (this.getStapel()) {
						this.getStapel().dropCards(this, stapel);
					} else {
						stapel.addCard(this);
					}
				} else {
					// place the card(s) back on the pile
					if (this.getStapel()) {
						this.getStapel().dragCardsEnd(this);
					}
					this.setPosition(this.input.dragStartX, this.input.dragStartY);
				}
			})
			.on('dragenter', function (pointer, stapel) {
				// stapel.border.setStrokeStyle(5, colorStapelBorderHover, 1);
				stapel.dragEnter(this);
			})
			.on('dragleave', function (pointer, stapel) {
				// stapel.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
				stapel.dragLeave(this);
			});
		scene.add.displayList.add(this);
		scene.input.setDraggable(this);

		// Set card values
		this.value = value;
		this.suit = suit;
		this.faceUp = true;
	}

	setStapelPos (pos) {
		this.stapel_pos = pos;
	}

	getStapelPos () {
		return this.stapel_pos;
	}

	setStapel (stapel) {
		this.stapel = stapel;
	}

	getStapel () {
		return this.stapel;
	}

	getValue () {
		return this.value;
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
