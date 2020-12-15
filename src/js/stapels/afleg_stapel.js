import { AbstractStapel } from './abstract_stapel';
import Phaser from 'phaser';
import { style } from '../style';

const colorStapelBorderIdle = style.colors.subtle.color32;
const colorStapelBorderGood = style.colors.hoverGood.color32;
const colorStapelBorderBad = style.colors.hoverBad.color32;

const cardDist = 1;
const cardWidth = 140;
const cardHeight = 190;
const padding = 12;

export class AflegStapel extends AbstractStapel {
	constructor (scene, x, y) {
		super(scene, x, y, cardWidth + padding * 2, cardHeight + padding * 2);

		scene.add.existing(this);
		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		this.setInteractive(undefined, undefined, true);

		this.cards = [];
		this.border = scene.add.rectangle(this.x, this.y + cardHeight / 2, this.width, this.height).setFillStyle().setStrokeStyle(5, colorStapelBorderIdle, 1);

		this.updateCards();

		this.setOrigin(0.5);
		this.border.setOrigin(0.5, 1);

		this.showBorder = false;
		this.border.setVisible(this.showBorder);
	}

	addCard (card) {
		super.addCard(card);

		// Bring this card to the top
		this.scene.children.bringToTop(card);

		card.angle = Phaser.Math.RND.normal() * 5;

		card.open();
		card.disableInteractive();

		this.updateCards();
	}

	popCard () {
		const card = super.popCard();

		this.updateCards();

		return card;
	}

	dragEnter (cards) {
		//  Just hide the border if this pile is empty
		if (this.cards.length === 0) {
			this.border.setVisible(this.showBorder);
		} else {
			this.border.setVisible(true);
			if (this.checkCards(cards)) {
				this.border.setStrokeStyle(5, colorStapelBorderGood, 1);
			} else if (this.cards.includes(cards[0])) {
				this.border.setVisible(this.showBorder);
			} else {
				this.border.setStrokeStyle(5, colorStapelBorderBad, 1);
			}
		}
	}

	dragLeave (cards) {
		this.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
		this.border.setVisible(this.showBorder);
	}

	setSize (width, height, resizeInput = true) {
		// this.border.setPosition(this.x, this.y);
		super.setSize(width, height, resizeInput);
		resizeRect(this.border, width, this.height);
	}

	checkCards (cards) {
		// You can't put cards on this if this is empty
		if (this.cards.length === 0) {
			return false;
		} else if (cards.length > 1) {
			// You can only put one card on this at a time
			return false;
		}

		// Return true if it is possible to place card on pile
		const topCard = this.cards[this.cards.length - 1];
		const card = cards[0];

		let cardPlus = topCard.value + 1;
		let cardMin = topCard.value - 1;

		// You can put an ace on a king and vice versa
		if (topCard.value === 13) {
			cardPlus = 1;
		} else if (topCard.value === 1) {
			cardMin = 13;
		}

		// Return if the card is either cardplus or cardmin
		return (card.value === cardPlus) || (card.value === cardMin);
	}

	removeCard (card) {
		card.angle = 0;
		super.removeCard(card);
		this.updateCards();
	}

	updateCards () {
		for (let i = 0; i < this.cards.length; i++) {
			const card = this.cards[i];
			card.disableInteractive();
			card.setPosition(this.x, this.y - i * cardDist - padding);
		}
		if (this.cards.length >= 2) {
			const height = cardHeight + cardDist * (this.cards.length - 1) + padding * 2;
			this.setSize(cardWidth + padding * 2, height);
		} else {
			this.setSize(cardWidth + padding * 2, cardHeight + padding * 2);
		}
		if (this.cards.length === 0) {
			this.border.setVisible(this.showBorder);
			this.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
		} else {
			this.border.setVisible(false);
		}
	}

	setShowBorder (showBorder) {
		this.showBorder = showBorder;
		this.updateCards();
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
