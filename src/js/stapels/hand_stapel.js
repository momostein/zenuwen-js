import { AbstractStapel } from './abstract_stapel';

const cardWidth = 140;
const cardHeight = 190;
const padding = 5;
const angelFactor = 35;
const distFactorX = 120;
const distFactorY = 35;

export class HandStapel extends AbstractStapel {
	constructor (scene, x, y, AI = false) {
		super(scene, x, y, cardWidth + padding * 2, cardHeight + padding * 2);

		this.AI = AI;

		scene.add.existing(this);

		this.cards = [];

		if (!this.AI) {
			this.setOrigin(0.5, 0.0);
		} else {
			this.setOrigin(0.5, 1.0);
		}
	}

	addCard (card) {
		super.addCard(card);

		// Bring this card to the top
		this.scene.children.bringToTop(card);

		this.updateCards();
	}

	popCard () {
		const card = super.popCard();

		this.updateCards();
		this.openTop();

		return card;
	}

	dragEnter (cards) {
	}

	dragLeave (cards) {
	}

	getDragCards (card) {
		if (this.containsCard(card)) {
			// Just slice the array from the index of the card till the end
			return [card];
		} else {
			throw new Error("Can't get dragCards if card isn't in this stapel");
		}
	}

	setSize (width, height, resizeInput = true) {
		// this.border.setPosition(this.x, this.y);
		super.setSize(width, height, resizeInput);
	}

	checkCards (cards) {
		// Return true if it is possible to place card on pile
		return false;
	}

	removeCard (card) {
		super.removeCard(card);

		this.updateCards();
	}

	openTop () {
		if (this.cards.length) {
			const topCard = this.cards[this.cards.length - 1];
			topCard.setInteractive().open();
		}
	}

	updateCards () {
		for (let i = 0; i < this.cards.length; i++) {
			const card = this.cards[i];
			card.setScale(1.7);
			var angle = ((i * angelFactor) - (this.cards.length - 1) * angelFactor / 2);
			var y;
			if (this.cards.length === 3 && (i === 0 || i === 2)) {
				y = this.y + distFactorY;
			} else {
				y = this.y;
			}
			card.setPosition(this.x + (i * distFactorX) - this.cards.length * distFactorX / 2, y);
			if (!this.AI) {
				card.angle = angle;
				card.setInteractive().open();
			} else {
				card.angle = -angle;
				card.disableInteractive().close();
			}
			this.scene.children.bringToTop(card);
		}
	}
}
