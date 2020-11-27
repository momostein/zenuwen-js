import { AbstractStapel } from './abstract_stapel';
import { style } from '../style';

const colorStapelBorderIdle = style.colors.subtle.color32;
const colorStapelBorderGood = style.colors.hoverGood.color32;
const colorStapelBorderBad = style.colors.hoverBad.color32;

const cardDist = 30;
const cardWidth = 140;
const cardHeight = 190;
const padding = 5;

export class PatienceStapel extends AbstractStapel {
	constructor (scene, x, y, AI = false) {
		super(scene, x, y, cardWidth + padding * 2, cardHeight + padding * 2);

		this.AI = AI;
		this.handStapel = false;

		scene.add.existing(this);
		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		if (!this.AI) {
			this.setInteractive(undefined, undefined, true);
		}

		this.cards = [];
		this.border = scene.add.rectangle(this.x, this.y, this.width, this.height).setFillStyle().setStrokeStyle(5, colorStapelBorderIdle, 1);
		this.border.setVisible(false);

		if (!this.AI) {
			this.setOrigin(0.5, 0.0);
			this.border.setOrigin(0.5, 0.0);
		} else {
			this.setOrigin(0.5, 1.0);
			this.border.setOrigin(0.5, 1.0);
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
		this.border.setVisible(true);

		if (this.checkCards(cards)) {
			this.border.setStrokeStyle(5, colorStapelBorderGood, 1);
		} else if (this.cards.includes(cards[0])) {
			this.border.setVisible(false);
		} else {
			this.border.setStrokeStyle(5, colorStapelBorderBad, 1);
		}
	}

	dragLeave (cards) {
		if (this.cards.length === 0) {
			this.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
			this.border.setVisible(true);
		} else {
			this.border.setVisible(false);
		}
	}

	getDragCards (card) {
		if (this.containsCard(card)) {
			// Just slice the array from the index of the card till the end

			return this.cards.slice(this.cards.indexOf(card));
		} else {
			throw new Error("Can't get dragCards if card isn't in this stapel");
		}
	}

	setSize (width, height, resizeInput = true) {
		// this.border.setPosition(this.x, this.y);
		super.setSize(width, height, resizeInput);
		resizeRect(this.border, width, this.height);
	}

	checkCards (cards) {
		// Return true if it is possible to place card on pile
		var size = this.getSize();
		if (size === 0) {
			return true;
		} else {
			const topcard = this.cards[this.cards.length - 1];
			for (const card of cards) {
				if (card.value !== topcard.value || this.cards.includes(card)) {
					return false;
				}
			}
			return true;
		}
	}

	removeCard (card) {
		super.removeCard(card);

		this.updateCards();

		this.openTop();
	}

	openTop () {
		if (this.cards.length) {
			const topCard = this.cards[this.cards.length - 1];
			if (!this.AI) {
				topCard.setInteractive();
			}
			topCard.open();
		}
	}

	updateCards () {
		var dist;
		if (this.cards.length > 7) {
			dist = cardDist * 0.75;
		} else {
			dist = cardDist;
		}
		for (let i = 0; i < this.cards.length; i++) {
			const card = this.cards[i];
			if (this.cards.length > 7) {
				dist = cardDist * 0.75;
			} else {
				dist = cardDist;
			}
			const height = this.AI
				? this.y - card.height / 2 - i * dist - padding
				: this.y + card.height / 2 + i * dist + padding;

			card.setPosition(this.x, height);
		}

		if (this.cards.length >= 2) {
			const height = cardHeight + dist * (this.cards.length - 1) + padding * 2;
			this.setSize(cardWidth + padding * 2, height);
		} else {
			this.setSize(cardWidth + padding * 2, cardHeight + padding * 2);
		}

		if (!this.handStapel) {
			if (this.cards.length === 0) {
				this.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
				this.border.setVisible(true);
			} else {
				this.border.setVisible(false);
			}
		}
	}

	setHandStapel () {
		this.handStapel = true;
		this.disableInteractive();
		this.border.setVisible(false);
	}
}

function resizeRect (rect, w, h) {
	// This will properly resize a rectangle without scaling the stroke

	// Resize the rectangle and its geometry
	rect.geom.setSize(w, h);
	rect.setSize(w, h);

	// update internal data
	rect.updateDisplayOrigin().updateData();
}
