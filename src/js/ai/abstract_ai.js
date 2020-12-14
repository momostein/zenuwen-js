const DefaultMoveTime = 1000;
const cardDist = 35;

export const difficulties = {
	easy: 1,
	normal: 2,
	hard: 3,
};

export class AbstractAI {
	constructor (patienceStapelsAI, handstapelAI, patienceStapelsPlayer, handstapelPlayer, aflegStapels, trekStapels) {
		this.patienceStapelsAI = patienceStapelsAI;
		this.handstapelAI = handstapelAI;

		this.patienceStapelsPlayer = patienceStapelsPlayer;
		this.handstapelPlayer = handstapelPlayer;

		this.aflegStapels = aflegStapels;
		this.trekStapels = trekStapels;

		this.cardAnimations = [];

		this.hand = false;
		this.idle = true;
	}

	update (time, delta) {
		// Iterate through cardAnimations backwards so we can safely remove items
		for (let i = this.cardAnimations.length - 1; i >= 0; i--) {
			const cardAnimation = this.cardAnimations[i];

			// console.debug('cardAnimation:', cardAnimation);

			if (cardAnimation.update(time, delta)) {
				this.cardAnimations.splice(i, 1);
			}
		}

		// if (!this.isMoving()) {
		// 	const dragCard = this.patienceStapelsAI[0].cards[this.patienceStapelsAI[0].cards.length - 1];

		// 	// console.log('dragCard:', dragCard);

		// 	if (dragCard) {
		// 		const dragCards = this.patienceStapelsAI[0].getDragCards(dragCard);

		// 		if (this.aflegStapels[0].checkCards(dragCards)) {
		// 			// Start to move the cards if it's allowed

		// 			console.debug('dragCards:', dragCards);
		// 			console.debug('aflegstapel', this.aflegStapels[0]);

		// 			this.cardAnimations.push(new CardAnimation(dragCards, this.patienceStapelsAI[0], this.aflegStapels[0]));
		// 		}
		// 	}
		// }
	}

	moveCards (cards, sourceStapel, targetStapel, moveTime = DefaultMoveTime) {
		this.cardAnimations.push(new CardAnimation(cards, sourceStapel, targetStapel, moveTime));
	}

	isMoving () {
		return this.cardAnimations.length > 0;
	}

	checkStapels () {
		let aantal = 0;
		for (const stapel of this.patienceStapelsAI) {
			aantal += stapel.cards.length;
		}

		if (aantal <= 3) {
			this.hand = true;
			for (const stapel of this.patienceStapelsAI) {
				let card = stapel.popCard();
				while (card) {
					this.handstapelAI.addCard(card);
					card = stapel.popCard();
				}
				stapel.disableStapel();
			}
		} else {
			this.hand = false;
		}
	}

	cancelAllMoves () {
		for (const cardAnimation of this.cardAnimations) {
			cardAnimation.cancel();
		}

		this.cardAnimations = [];
	}

	resetTimers () {}
}

class CardAnimation {
	constructor (cards, sourceStapel, targetStapel, moveTime = DefaultMoveTime) {
		// The cards we're currently moving
		this.cards = cards;

		// Bring the cards being dragged to the top
		for (const card of this.cards) {
			// Save their original position before dragging
			card.savePos();
			card.scene.children.bringToTop(card);
			card.setScale(1);
			card.setAngle(0);
			card.open();
		}

		// Stapels
		this.sourceStapel = sourceStapel;
		this.targetStapel = targetStapel;

		// Stapel position vectors
		// getCenter() gets the center vector regardless of the origin
		this.sourceVec = sourceStapel.getCenter();
		this.targetVec = targetStapel.getCenter();

		// movetime and time counter
		this.moveTime = moveTime;
		this.timeCount = 0;

		// If we're returning to the source stapel or not
		this.returning = false;
	}

	update (time, delta) {
		if (this.canceled) {
			return true;
		}

		let finished = false;

		this.returning = !this.targetStapel.checkCards(this.cards);

		// Update timestep and check if we're finished
		if (!this.returning) {
			// increment if we're moving towards targetstapel
			this.timeCount += delta;

			// Check if we're at the target
			finished = this.timeCount >= this.moveTime;
		} else {
			// Decrement if we're returning towards the source stapel
			this.timeCount -= delta;

			// Check if we're back at the source
			finished = this.timeCount <= 0;
		}

		if (!finished) {
			// Move cards if we aren't finished

			// Get the timecount in a percentage 0. - 1.0
			const t = this.timeCount / this.moveTime;

			// Linearly interpolate between the position vectors with the time percentage
			const lerpVec = this.sourceVec.clone().lerp(this.targetVec, t);

			// Move all cards
			for (let i = 0; i < this.cards.length; i++) {
				const card = this.cards[i];

				// Add cumulative card distance to the additional cards to stagger them
				card.setPosition(lerpVec.x, lerpVec.y + i * cardDist);
			}
		} else if (!this.returning) {
			// Move cards to the other stapel if we're finished and not returning
			for (const card of this.cards) {
				// Remove from source stapel
				if (card.stapel) {
					card.stapel.removeCard(card);
				}

				// Add to targetstapel
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

	cancel () {
		this.canceled = true;
		this.sourceStapel.updateCards();
	}
}
