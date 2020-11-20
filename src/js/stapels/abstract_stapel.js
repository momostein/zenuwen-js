import Phaser from 'phaser';

export class AbstractStapel extends Phaser.GameObjects.Zone {
	/* constructor() {
        if (this.constructor === AbstractStapel) {
            throw new TypeError('Abstract class "AbstractStapel" cannot be instantiated directly.');
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
		card.stapel = this;
	}

	popCard () {
		const card = this.cards.pop();
		if (card) {
			card.stapel = null;
		}
		return card;
	}

	containsCard (card) {
		// If stapel contains Card
		return (this.cards.includes(card));
	}

	dragEnter (cards) {
		console.error("This stapel shouldn't receive a dragenter event!");
	}

	dragLeave (cards) {
		console.error("This stapel shouldn't receive a drageleave event!");
	}

	checkCards (cards) {
		return false;
	}

	getDragCards (card) {
		if (this.containsCard(card)) {
			return [card];
		} else {
			throw new Error("Can't get dragCards if card isn't in this stapel");
		}
	}

	removeCard (card) {
		// Search the card in the stapel and remove it
		// Reverse direction because the card is usually at the top
		for (let i = this.cards.length - 1; i >= 0; i--) {
			const stapelCard = this.cards[i];
			if (stapelCard === card) {
				this.cards.splice(i, 1);

				card.stapel = null;

				return card;
			}
		}

		throw new Error("Can't remove a card that's not in this stapel");
	}
}
