import { AbstractAI, difficulties } from './abstract_ai';

const timing = {
	easy: {
		afleg: 2000,
		patience: 1000,
		idle: 2000,
	},
	normal: {
		afleg: 1000,
		patience: 500,
		idle: 1000,
	},
	hard: {
		afleg: 500,
		patience: 250,
		idle: 500,
	},
};

export class BasicAI extends AbstractAI {
	constructor (
		patienceStapelsAI, handstapelAI,
		patienceStapelsPlayer, handstapelPlayer,
		aflegStapels, trekStapels,
		difficulty = difficulties.normal,
	) {
		super(
			patienceStapelsAI, handstapelAI,
			patienceStapelsPlayer, handstapelPlayer,
			aflegStapels, trekStapels,
		);

		switch (difficulty) {
			case difficulties.easy:
				this.timing = timing.easy;
				break;
			case difficulties.normal:
				this.timing = timing.normal;
				break;
			case difficulties.hard:
				this.timing = timing.hard;
				break;
			default:
				this.timing = timing.normal;
				break;
		}

		this.moveTime = this.timing.afleg;
		this.patienceTime = this.timing.patience;
		this.idleTime = this.timing.idle;

		this.idleTimer = 0;

		this.reset = true;
	}

	update (time, delta) {
		super.update(time, delta);

		// console.debug('time:', time, '\tdelta:', delta);
		// console.debug('time passed since last move:', time - this.idleTimer);
		if (this.reset) {
			this.idleTimer = time;
			this.reset = false;
		}

		if (!this.isMoving()) {
			this.checkStapels();

			// Make a move if we've been idle for longer than idle Time
			if ((time - this.idleTimer) > this.idleTime) {
				// FIRST CHECK aflegstapels
				// TODO: CHECK AFLEGSTAPELS

				console.log('AI trying to make move...');
				this.idleTimer = time;

				if (!this.hand) {
					console.log('Cards not in hand');

					// Kaarten nog niet in de hand
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

									if (
										dragCards.length 			=== sourceStapel.cards.length &&
										targetStapel.cards.length 	=== 0
									) {
										// Moving a full stapel to an empty spot is not a good idea
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
				} else {
					// Kaarten op de hand
					for (const card of this.handstapelAI.cards) {
						const dragCards = [card];

						for (const aflegStapel of this.aflegStapels) {
							if (aflegStapel.checkCards(dragCards)) {
								this.moveCards(
									dragCards,
									this.handstapelAI,
									aflegStapel,
									this.aflegTime,
								);

								break;
							}
						}
						if (this.isMoving()) { break; }
					}
				}

				// If the AI isn't  moving at this point, it has no moves.
				this.idle = !this.isMoving();
			}
		} else {
			this.idleTimer = time;
		}
	}

	resetTimers () {
		this.idle = false;
		this.reset = true;
	}
}

function countCards (stapels) {
	let aantal = 0;
	for (const stapel of stapels) {
		aantal += stapel.getSize();
	}
	return aantal;
}
