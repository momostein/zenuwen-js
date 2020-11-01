import Phaser from 'phaser';

import getCardFrame from './card_frames';

export class Card extends Phaser.GameObjects.Image {
	constructor (scene, x, y, value = -1, suit) {
		super(scene, x, y);
		this.stapel = undefined;
		this.setTexture('playingCards', getCardFrame(value, suit));
		this.setScale(1, 1);
		this.stapel_pos = undefined;
		this.setInteractive()
			.on('dragstart', function (pointer) {
				scene.children.bringToTop(this);
				if (this.getStapel()) {
					for (let i = this.stapel_pos + 1; i < this.getStapel().getSize(); i++) {
						scene.children.bringToTop(this.getStapel().cards[i]);
					}
				}
			})
			.on('dragend', function (pointer, x, y, dropped) {
				if (!dropped) {
					if (this.getStapel()) {
						for (let i = this.stapel_pos + 1; i < this.getStapel().getSize(); i++) {
							this.getStapel().cards[i].x = this.input.dragStartX;
							this.getStapel().cards[i].y = this.input.dragStartY + (i - this.stapel_pos) * this.getStapel().getCardDist();
						}
					}
					this.x = this.input.dragStartX;
					this.y = this.input.dragStartY;
				}
			})
			.on('drag', function (pointer, dragX, dragY) {
				this.x = dragX;
				this.y = dragY;
				if (this.getStapel()) {
					for (let i = this.stapel_pos + 1; i < this.getStapel().getSize(); i++) {
						this.getStapel().cards[i].x = dragX;
						this.getStapel().cards[i].y = dragY + (i - this.stapel_pos) * this.getStapel().getCardDist();
					}
				}
			})
			.on('drop', function (pointer, stapel) {
				// stapel.border.setStrokeStyle(5, colorStapelBorderIdle, 1);

				if (stapel.containsCard(this)) {
					this.x = this.input.dragStartX;
					this.y = this.input.dragStartY;
				} else {
					if (this.getStapel()) {
						const size = this.getStapel().getSize();
						for (let i = this.stapel_pos + 1; i < size; i++) {
							stapel.addCard(this.getStapel().popCard());
						}
						this.getStapel().popCard();
					}
					stapel.addCard(this);
				} else {
					if (this.getStapel()) {
						for (let i = this.stapel_pos + 1; i < this.getStapel().getSize(); i++) {
							this.getStapel().cards[i].x = this.input.dragStartX;
							this.getStapel().cards[i].y = this.input.dragStartY + (i - this.stapel_pos) * this.getStapel().getCardDist();
						}
					}
					this.x = this.input.dragStartX;
					this.y = this.input.dragStartY;
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
