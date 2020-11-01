import Phaser from 'phaser';

export class abstractStapel extends Phaser.GameObjects.Zone {
	/* constructor() {
        if (this.constructor === abstractStapel) {
            throw new TypeError('Abstract class "abstractStapel" cannot be instantiated directly.');
        }

    } */
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);
		scene.add.existing(this);

		this.cards = [];
	}

	getSize () {
		// number of cards
		return this.cards.length;
	}

	addCard (card) {
		this.cards.push(card);
		card.setStapel(this);
	}

	popCard () {
		const card = this.cards.pop();
		card.setStapel(null);
		return card;
	}

	containsCard (card) {
		// If stapel contains Card
		return (this.cards.includes(card));
	}
}

export class AflegStapel extends abstractStapel {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);

		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		this.setInteractive(undefined, undefined, true);

		this.border = scene.add.rectangle(this.x, this.y, this.width, this.height).setFillStyle().setStrokeStyle(5, 0xff0000, 1);

		this.setOrigin(0.5, 0.0);
		this.border.setOrigin(0.5, 0.0);
	}

	addCard (card) {
		if (this.getSize() !== 0) {
			this.cards[this.getSize() - 1].disableInteractive().close();
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height + 20, true);
			// this.setDisplaySize(this.width, this.height + 20); // Zones aren't rendered
		} else {
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		resizeRect(this.border, this.width, this.height);

		super.addCard(card);

		card.x = (this.x);
		card.y = (this.y + card.height / 2 + this.getSize() * 20 - 5);
	}

	popCard () {
		if (this.getSize() >= 2) {
			this.cards[this.getSize() - 2].setInteractive().open();
			// this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height - 20, true);
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

	// getNumberOfCards () {
	// 	return this.cards.length;
	// }

	// containsCard (card) {
	// 	return (this.cards.includes(card));
	// }
}

function resizeRect (rect, w, h) {
	// This will properly resize a rectangle without scaling the stroke

	// Resize the rectangle and its geometry
	rect.geom.setSize(w, h);
	rect.setSize(w, h);

	// update internal data
	rect.updateDisplayOrigin().updateData();
}
