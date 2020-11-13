import { AbstractStapel } from './stapels';
import { style } from './style';
import Phaser from 'phaser';

const colorStapelBorderIdle = style.colors.primary.color32;
const colorStapelBorderHover = style.colors.secondary.color32;
const colorStapelBorderWrong = 0xFF0000;

const cardDist = -2;
const cardWidth = 140;
const cardHeight = 190;
const padding = 5;

export class AflegStapel extends AbstractStapel {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, cardWidth + padding * 2, cardHeight + padding * 2);

		scene.add.existing(this);
		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		this.setInteractive(undefined, undefined, true);

		this.cards = [];
		this.border = scene.add.rectangle(this.x, this.y, this.width, this.height).setFillStyle().setStrokeStyle(5, colorStapelBorderIdle, 1);
		this.border.setVisible(false);

		this.setOrigin(0.5, 0.0);
		this.border.setOrigin(0.5, 0.0);
	}

	addCard (card) {
		super.addCard(card);

		// Bring this card to the top
		this.scene.children.bringToTop(card);

		card.setPosition(this.x, this.y + card.height / 2);
		card.angle = Phaser.Math.RND.between(-5, 5);
		this.updateCards();
	}

	popCard () {
		const card = super.popCard();

		this.updateCards();

		return card;
	}

	dragEnter (cards) {
		if (this.checkCards(cards)) {
			this.border.setStrokeStyle(5, colorStapelBorderHover, 1);
		} else {
			this.border.setStrokeStyle(5, colorStapelBorderWrong, 1);
		}

		this.border.setVisible(true);
	}

	dragLeave (cards) {
		this.border.setVisible(false);
	}

	setSize (width, height, resizeInput = true) {
		// this.border.setPosition(this.x, this.y);
		super.setSize(width, height, resizeInput);
		resizeRect(this.border, width, this.height);
	}

	checkCards (cards) {
		console.log(cards);
		// Return true if it is possible to place card on pile
		const topCard = this.cards[this.cards.length - 1];
		var size = this.getSize();
		var cardPlus = topCard.value + 1;
		var cardMin = topCard.value - 1;
		if (topCard.value === 13) {
			cardPlus = 1;
		} else if (topCard.value === 1) {
			cardMin = 13;
		}
		if (size === 0) {
			return true;
		} else {
			for (const card of cards) {
				if ((card.value !== cardPlus) && (card.value !== cardMin)) {
					return false;
				}
			}
		}
		return true;
	}

	removeCard (card) {
		super.removeCard(card);

		this.updateCards();
	}

	updateCards () {
		for (let i = 0; i < this.cards.length; i++) {
			const card = this.cards[i];
			card.disableInteractive();
			card.setPosition(this.x, this.y + card.height / 2 + i * cardDist + padding);
		}

		if (this.cards.length >= 2) {
			const height = cardHeight + cardDist * (this.cards.length - 1) + padding * 2;
			this.setSize(cardWidth + padding * 2, height);
		} else {
			this.setSize(cardWidth + padding * 2, cardHeight + padding * 2);
		}

		if (this.cards.length === 0) {
			this.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
			this.border.setVisible(true);
		} else {
			this.border.setVisible(false);
		}
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
