import Phaser from 'phaser';
import getCardFrame from './card_frames';

const cardDist = 35;

export class Card extends Phaser.GameObjects.Image {
	constructor (scene, x, y, value = -1, suit) {
		super(scene, x, y);

		this.setTexture('playingCards', getCardFrame(value, suit));
		this.setScale(1, 1);

		// Current stapel and current index in the stapel
		this.stapel = null;

		// Current cards being dragged
		this.dragCards = [];

		// Saved position before dragging
		this.savedPosX = x;
		this.savedPosY = y;

		this.setInteractive();

		this.on('dragstart', function (pointer) {
			this.setScale(1);
			if (this.stapel) {
				// If the card is in a pile, get the cards on top of it too
				this.dragCards = this.stapel.getDragCards(this);

				// // Only use this as a last resort
				// if (!this.dragCards.includes(this)) {
				// 	this.dragCards.unshift(this);
				// }
			} else {
				// Otherwise only get this card
				this.dragCards = [this];
			}

			// Bring the cards being dragged to the top
			for (const card of this.dragCards) {
				// Save their original position before dragging
				card.savePos();
				card.scene.children.bringToTop(card);
			}
		});

		this.on('dragend', function (pointer, x, y, dropped) {
			// if the card is not dropped on a stapel,
			// Move them to their original position
			if (!dropped) {
				if (this.stapel) {
					this.stapel.updateCards();
				}
			}
		});

		this.on('drag', function (pointer, dragX, dragY) {
			// Make all dragged cards follow the mouse
			for (let i = 0; i < this.dragCards.length; i++) {
				this.dragCards[i].setPosition(dragX, dragY + i * cardDist);
			}
		});

		this.on('drop', function (pointer, stapel) {
			// The drag ends when dropped so it leaves also
			stapel.dragLeave(this.dragCards);
			// stapel.border.setStrokeStyle(5, colorStapelBorderIdle, 1);

			// check if cards can placed on pile
			if (stapel.checkCards(this.dragCards)) {
				// place the card(s) on the new pile
				for (const card of this.dragCards) {
					// if (card.stapel !== stapel) {
					console.log('removing card', card);
					card.stapel.removeCard(card);
					stapel.addCard(card);
					// }
				}
				this.scene.checkStapels();
			} else {
				// place the card(s) back on the pile
				if (this.stapel) {
					this.stapel.updateCards();
				}
			}
		});

		this.on('dragenter', function (pointer, stapel) {
			// stapel.border.setStrokeStyle(5, colorStapelBorderHover, 1);
			stapel.dragEnter(this.dragCards);
		});
		this.on('dragleave', function (pointer, stapel) {
			// stapel.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
			stapel.dragLeave(this.dragCards);
		});

		scene.add.displayList.add(this);
		scene.input.setDraggable(this);

		// Set card values
		this.value = value;
		this.suit = suit;
		this.faceUp = true;
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

	savePos () {
		this.savedPosX = this.x;
		this.savedPosY = this.y;
	}
}
