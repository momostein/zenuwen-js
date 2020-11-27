const moveTime = 1000;
const cardDist = 35;

export class AbstractAI {
	constructor (patienceStapelsAI, handstapelAI, patienceStapelsPlayer, handstapelPlayer, aflegStapels, trekStapels) {
		this.patienceStapelsAI = patienceStapelsAI;
		this.handstapelAI = handstapelAI;

		this.patienceStapelsPlayer = patienceStapelsPlayer;
		this.handstapelPlayer = handstapelPlayer;

		this.aflegStapels = aflegStapels;
		this.trekStapels = trekStapels;

		this.cardAnimations = [];
	}

	update (time, delta) {
		// Iterate through cardAnimations backwards so we can safely remove items
		for (let i = this.cardAnimations.length - 1; i >= 0; i--) {
			const cardAnimation = this.cardAnimations[i];

			console.log('cardAnimation:', cardAnimation);

			if (cardAnimation.update(time, delta)) {
				this.cardAnimations.splice(i, 1);
			}
		}

		if (!this.isMoving()) {
			const dragCard = this.patienceStapelsAI[0].cards[this.patienceStapelsAI[0].cards.length - 1];

			// console.log('dragCard:', dragCard);

			if (dragCard) {
				const dragCards = this.patienceStapelsAI[0].getDragCards(dragCard);

				if (this.aflegStapels[0].checkCards(dragCards)) {
					// Start to move the cards if it's allowed

					console.debug('dragCards:', dragCards);
					console.debug('aflegstapel', this.aflegStapels[0]);

					this.cardAnimations.push(new CardAnimation(dragCards, this.patienceStapelsAI[0], this.aflegStapels[0]));
				}
			}
		}
	}

	moveCards (cards, sourceStapel, targetStapel) {
		this.cardAnimations.push(new CardAnimation(cards, sourceStapel, targetStapel));
	}

	isMoving () {
		return this.cardAnimations.length > 0;
	}
}

class CardAnimation {
	constructor (cards, sourceStapel, targetStapel) {
		this.cards = cards;

		// Bring the cards being dragged to the top
		for (const card of this.cards) {
			// Save their original position before dragging
			card.savePos();
			card.scene.children.bringToTop(card);
		}

		this.sourceStapel = sourceStapel;
		this.targetStapel = targetStapel;

		this.sourceVec = sourceStapel.getCenter();
		this.targetVec = targetStapel.getCenter();

		this.timeCount = 0;

		this.returning = false;
	}

	update (time, delta) {
		let finished = false;

		this.returning = !this.targetStapel.checkCards(this.cards);

		if (!this.returning) {
			this.timeCount += delta;

			finished = this.timeCount >= moveTime;
		} else {
			this.timeCount -= delta;

			finished = this.timeCount <= 0;
		}

		if (!finished) {
			// Move cards if we aren't finished
			const t = this.timeCount / moveTime;

			// Linearly interpolate between the position vectors
			const lerpVec = this.sourceVec.clone().lerp(this.targetVec, t);

			for (let i = 0; i < this.cards.length; i++) {
				const card = this.cards[i];

				card.setPosition(lerpVec.x, lerpVec.y + i * cardDist);
			}
		} else if (!this.returning) {
			// Move cards to the other stapel if we're finished and not returning
			for (const card of this.cards) {
				if (card.stapel) {
					card.stapel.removeCard(card);
				}

				this.targetStapel.addCard(card);
			}
		} else {
			// Reset the card positions of all the sourceStapels
			for (const card of this.cards) {
				if (card.stapel) {
					card.stapel.updateCards();
				}
			}
		}

		return finished;
	}
}
