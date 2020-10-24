import Phaser from 'phaser';

export class Stapel extends Phaser.GameObjects.Zone {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);

		scene.add.existing(this);

		// Make this a dropzone with default shape without a callback
		// This makes it resizable
		this.setInteractive(undefined, undefined, true);

		this.cards = [];
		this.border = scene.add.rectangle(this.x, this.y, this.width, this.height).setFillStyle().setStrokeStyle(5, 0xff0000, 1);

		this.setOrigin(0.5, 0.0);
		this.border.setOrigin(0.5, 0.0);
	}

	addCard (card) {
		if (this.getNumberOfCards() !== 0) {
			this.cards[this.getNumberOfCards() - 1].disableInteractive().close();

			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height + 20, true);
			// this.setDisplaySize(this.width, this.height + 20); // Zones aren't rendered
		} else {
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		resizeRect(this.border, this.width, this.height);
		this.cards.push(card);
	}

	popCard () {
		if (this.getNumberOfCards() >= 2) {
			this.cards[this.getNumberOfCards() - 2].setInteractive().open();
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height - 20, true);
			// this.setDisplaySize(this.width, this.height - 20); // Zones aren't rendered
		} else {
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height, true);
			// this.setDisplaySize(this.width, this.height); // Zones aren't rendered
		}

		// this.border.setPosition(this.x, this.y);
		resizeRect(this.border, this.width, this.height);
		this.cards.pop();
	}

	getNumberOfCards () {
		return this.cards.length;
	}

	containsCard (card) {
		return (this.cards.includes(card));
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
