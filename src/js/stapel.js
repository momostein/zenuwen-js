import Phaser from 'phaser';

export class Stapel extends Phaser.GameObjects.Zone {
	constructor (scene, x, y, width, height) {
		super(scene, x, y, width, height);
		scene.add.existing(this);
		this.setRectangleDropZone(width, height);
		this.cards = [];
		this.border = scene.add.rectangle(this.x, this.y, this.width, this.height).setFillStyle().setStrokeStyle(5, 0xff0000, 1);
	}

	addCard (card) {
		if (this.getNumberOfCards() != 0) {
			this.cards[this.getNumberOfCards() - 1].disableInteractive();
			this.setPosition(this.x, this.y + 10);
			this.setSize(this.width, this.height + 20);
			this.setDisplaySize(this.width, this.height + 20);
		} else {
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height);
			this.setDisplaySize(this.width, this.height);
		}

		this.border.setPosition(this.x, this.y);
		this.border.setDisplaySize(this.width, this.height);
		this.cards.push(card);
	}

	popCard () {
		if (this.getNumberOfCards() >= 2) {
			this.cards[this.getNumberOfCards() - 2].setInteractive();
			this.setPosition(this.x, this.y - 10);
			this.setSize(this.width, this.height - 20);
			this.setDisplaySize(this.width, this.height - 20);
		} else {
			this.setPosition(this.x, this.y);
			this.setSize(this.width, this.height);
			this.setDisplaySize(this.width, this.height);
		}

		this.border.setPosition(this.x, this.y);
		this.border.setDisplaySize(this.width, this.height);
		this.cards.pop();
	}

	getNumberOfCards () {
		return this.cards.length;
	}

	containsCard (card) {
		return (this.cards.includes(card));
	}
}
