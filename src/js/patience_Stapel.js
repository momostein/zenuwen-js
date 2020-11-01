import { abstractStapel } from './abstract_Stapel';
export class PatienceStapel extends abstractStapel {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);
		this.cardDist = 35;
	}

	checkCard (card) {
		var size = this.getSize();
		return (size === 0 || this.cards[size - 1].getValue() === card.getValue());
	}

	addCard (card) {
		if (this.getSize() !== 0) {
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height + this.cardDist, true);
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
		this.cards.push(card);
		this.scene.children.bringToTop(card);

		card.setStapel(this);
		card.x = (this.x);
		card.y = (this.y + card.height / 2 + this.getSize() * this.cardDist - (this.cardDist - 15));
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
