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
								return;
							}
						}
					}
				}
			}
		} else {
			this.idleTimer = time;
		}
	}
}
