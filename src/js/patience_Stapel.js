import { abstractStapel } from './stapels';
import { style } from './style';

const colorStapelBorderIdle = style.colors.primary.color32;
const colorStapelBorderHover = style.colors.secondary.color32;
const cardDist = 35;
export class PatienceStapel extends abstractStapel {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);

		scene.add.existing(this);
		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		this.setInteractive(undefined, undefined, true);

		this.cards = [];
		this.border = scene.add.rectangle(this.x, this.y, this.width, this.height).setFillStyle().setStrokeStyle(5, colorStapelBorderIdle, 1);

		this.setOrigin(0.5, 0.0);
		this.border.setOrigin(0.5, 0.0);
	}

	checkCard (card) {
		// Return true if it is possible to place card on pile
		var size = this.getSize();
		return ((size === 0 || this.cards[size - 1].getValue() === card.getValue()) && !this.containsCard(card));
	}

	addCard (card) {
		if (this.getSize() !== 0) {
			// place card when pile is not empty
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height + cardDist, true);
			// this.setDisplaySize(this.width, this.height + 20); // Zones aren't rendered
		} else {
			// place card when pile is empty
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}
		// needs to be changed so that al dealt cards are not visible
		if (!this.checkCard(card)) {
			this.cards[this.getSize() - 1].disableInteractive().close();
		}
		// this.border.setPosition(this.x, this.y);
		resizeRect(this.border, this.width, this.height);
		card.setStapelPos(this.getSize());

		super.addCard(card);
		// place card
		this.scene.children.bringToTop(card);
		card.setPosition(this.x, this.y + card.height / 2 + this.getSize() * cardDist - (cardDist - 15));
	}

	popCard () {
		if (this.getSize() >= 2) {
			this.cards[this.getSize() - 2].setInteractive().open();
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height - cardDist, true);
			// this.setDisplaySize(this.width, this.height - 20); // Zones aren't rendered
		} else {
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		resizeRect(this.border, this.width, this.height);
		return super.popCard();
	}

	dragEnter (card) {
		if (!this.containsCard(card)) {
			this.border.setStrokeStyle(5, colorStapelBorderHover, 1);
		}
	}

	dragLeave (card) {
		this.border.setStrokeStyle(5, colorStapelBorderIdle, 1);
	}

	dragCardsStart (card) {
		// Bring cards to top
		for (let i = card.getStapelPos(); i < this.getSize(); i++) {
			this.scene.children.bringToTop(this.cards[i]);
		}
	}

	dragCardsEnd (card) {
		// Place the cards back on the pile
		for (let i = card.getStapelPos(); i < this.getSize(); i++) {
			this.cards[i].setPosition(card.input.dragStartX, card.input.dragStartY + (i - card.getStapelPos()) * cardDist);
		}
	}

	dragCards (card, dragX, dragY) {
		// Let the cards follow the mouse whit a y-distance between cards
		for (let i = card.getStapelPos(); i < this.getSize(); i++) {
			this.cards[i].setPosition(dragX, dragY + (i - card.getStapelPos()) * cardDist);
		}
	}

	dropCards (card, stapel) {
		// Place cards on other pile and pop them form this pile
		const size = this.getSize();
		for (let i = card.getStapelPos(); i < size; i++) {
			stapel.addCard(this.popCard());
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
