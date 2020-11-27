import AbstractAI from './abstract_ai';

export default class BasicAI extends AbstractAI {
	constructor (
		patienceStapelsAI, handstapelAI,
		patienceStapelsPlayer, handstapelPlayer,
		aflegStapels, trekStapels,
		aflegTime = 1000, patienceTime = 500, idleTime = 1000,
	) {
		super(
			patienceStapelsAI, handstapelAI,
			patienceStapelsPlayer, handstapelPlayer,
			aflegStapels, trekStapels,
		);

		this.moveTime = aflegTime;
		this.patienceTime = patienceTime;
		this.idleTime = idleTime;

		this.idleTimer = 0;
	}

	update (time, delta) {
		super.update(time, delta);

		// console.debug('time:', time, '\tdelta:', delta);
		console.debug('time passed since last move:', time - this.idleTimer);

		if (!this.isMoving()) {
			// Make a move if we've been idle for longer than idle Time
			if ((time - this.idleTimer) > this.idleTime) {
				console.log('AI trying to make move...');
				this.idleTimer = time;

				for (const patienceStapel of this.patienceStapelsAI) {
					const topCard = patienceStapel.cards[patienceStapel.cards.length - 1];

					if (topCard) {
						const dragCards = patienceStapel.getDragCards(topCard);

						for (const aflegStapel of this.aflegStapels) {
							if (aflegStapel.checkCards(dragCards)) {
								this.moveCards(
									dragCards,
									patienceStapel,
									aflegStapel,
									this.aflegTime,
								);

								break;
							}
						}
					}

					// Break the loop if we made a move
					if (this.isMoving()) { break; }
				}

				// If we couldn't make a move to an aflegstapel,
				// see if we can make a move between our stapels
				if (!this.isMoving()) {
					console.log("Couldn't make a move to aflegstapel...");

					for (const sourceStapel of this.patienceStapelsAI) {
						const dragCards = [];

						for (let i = sourceStapel.cards.length - 1; i >= 0; i--) {
							const card = sourceStapel.cards[i];

							if (card && card.faceUp) {
								dragCards.unshift(card);
							} else {
								break;
							}
						}

						if (dragCards.length > 0) {
							console.log(dragCards);

							for (const targetStapel of this.patienceStapelsAI) {
								if (targetStapel === sourceStapel) {
								// Don't try to move to cards to itself
									continue;
								}

								if (targetStapel.checkCards(dragCards)) {
								// Move the cards but only take patienceTime
									this.moveCards(
										dragCards,
										sourceStapel, targetStapel,
										this.patienceTime,
									);

									break;
								}
							}
						}

						// Break the loop if we made a move
						if (this.isMoving()) { break; }
					}
				}
			}
		} else {
			this.idleTimer = time;
		}
	}
}
