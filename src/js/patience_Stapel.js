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
		var size = this.getSize();
		return ((size === 0 || this.cards[size - 1].getValue() === card.getValue()) && !this.containsCard(card));
	}

	addCard (card) {
		if (this.getSize() !== 0) {
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height + cardDist, true);
			// this.setDisplaySize(this.width, this.height + 20); // Zones aren't rendered
		} else {
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}
		if (!this.checkCard(card)) {
			this.cards[this.getSize() - 1].disableInteractive().close();
		}
		// this.border.setPosition(this.x, this.y);
		resizeRect(this.border, this.width, this.height);
		card.setStapelPos(this.getSize());

		super.addCard(card);

		this.scene.children.bringToTop(card);
		card.x = (this.x);
		card.y = (this.y + card.height / 2 + this.getSize() * cardDist - (cardDist - 15));
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
}

function resizeRect (rect, w, h) {
	// This will properly resize a rectangle without scaling the stroke

	// Resize the rectangle and its geometry
	rect.geom.setSize(w, h);
	rect.setSize(w, h);

	// update internal data
	rect.updateDisplayOrigin().updateData();
}
