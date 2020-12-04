import { AbstractStapel } from './abstract_stapel';

const layoutPlayer = { x: 110, y: 34, angle: 35 };
const layoutAI = { x: 97, y: -17, angle: 20 };

export class HandStapel extends AbstractStapel {
	constructor (scene, x, y, AI = false) {
		super(scene, x, y);

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
		for (let i = -1; i < this.cards.length - 1; i++) {
			const card = this.cards[i + 1];
			if (!this.AI) {
				card.setScale(1.5);
			}

			var layout;
			if (!this.AI) {
				layout = layoutPlayer;
			} else {
				layout = layoutAI;
			}

			var angle, x, y;
			if (this.cards.length === 3) {
				angle = i * layout.angle;
				x = this.x + (i * layout.x);
				if (Math.abs(i) === 1) {
					y = this.y + layout.y;
				} else {
					y = this.y;
				}
			} else if (this.cards.length === 2) {
				angle = (i + 1) * layout.angle - (layout.angle / 2);
				x = this.x + (i + 1) * layout.x - (layout.x / 2);
				y = this.y;
			} else {
				angle = 0;
				x = this.x;
				y = this.y;
			}

			card.setPosition(x, y);
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
