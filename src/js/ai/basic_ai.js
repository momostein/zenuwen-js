import { AbstractAI, difficulties } from './abstract_ai';

const debugTag = 'BASIC_AI:';

const timing = {
	easy: {
		afleg: 1500,
		patience: 600,
		idle: 1500,
		slap: 1000,
	},
	normal: {
		afleg: 700,
		patience: 400,
		idle: 1000,
		slap: 500,
	},
	hard: {
		afleg: 400,
		patience: 250,
		idle: 500,
		slap: 300,
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

		// Save timings
		this.moveTime = this.timing.afleg;
		this.patienceTime = this.timing.patience;
		this.idleTime = this.timing.idle;
		this.slapTime = this.timing.slap;

		this.idleTimer = 0;
		this.reset = true;

		this.slapping = false;
		this.slapMode = 'ai';
	}

	update (time, delta) {
		super.update(time, delta);

		// Return value
		let slapped = false;

		// console.debug(debugTag, 'time:', time, '\tdelta:', delta);
		// console.debug(debugTag, 'time passed since last move:', time - this.idleTimer);
		if (this.reset) {
			// Don't reset if we're already slapping
			if (!this.slapping) {
				this.idleTimer = time;
				this.reset = false;
			}
		}
		if (!this.isMoving()) {
			this.checkStapels();

			if (!this.slapping) {
			// Make a move if we've been idle for longer than idle Time
				const numCardsPlayer =
					countCards(this.patienceStapelsPlayer) +
					countCards([this.handstapelPlayer]);

				const numCardsAI =
					countCards(this.patienceStapelsAI) +
					countCards([this.handstapelAI]);

				if (numCardsPlayer === 0) {
					// Reset timer
					this.idleTimer = time;

					// Turn on slapping and set slapmode to player
					this.slapping = true;
					this.slapMode = 'player';
				} else if (numCardsAI === 0) {
					// Reset timer
					this.idleTimer = time;

					// Turn on slapping and set slapmode to player
					this.slapping = true;
					this.slapMode = 'ai';
				}
			}

			if (!this.slapping) {
				// We don't have to slap any stapels yet

				if ((time - this.idleTimer) > this.idleTime) {
					console.log(debugTag, 'AI trying to make move...');
					this.idleTimer = time;

					if (!this.hand) {
						console.log(debugTag, 'AI cards not in hand');

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
							console.log(debugTag, "Couldn't make a move to aflegstapel...");

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
									console.debug(debugTag, 'dragcards:', dragCards);

									// Save topcards in array
									const topCards = [];
									for (const targetStapel of this.patienceStapelsAI) {
										const top = targetStapel.cards[targetStapel.cards.length - 1];
										if (top && targetStapel !== sourceStapel) {
											topCards.push(top.value);
										}
									}

									for (const targetStapel of this.patienceStapelsAI) {
										if (targetStapel === sourceStapel) {
										// Don't try to move to cards to itself
											continue;
										}

										// Moving a full stapel to an empty spot is not a good idea
										if (
											dragCards.length 			=== sourceStapel.cards.length &&
											targetStapel.cards.length 	=== 0
										) {
											continue;
										}

										// Don't move cards to a empty pile when there is another pile with the same topcard
										if (topCards.includes(dragCards[0].value) && targetStapel.cards.length === 0) {
											continue;
										}

										// If all strategy checks passed, check if the rules allow the move
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
				// We have to slap a stapel
				if (this.slapMode === 'player' && (time - this.idleTimer) > this.slapTime) {
					slapped = true;
				} else if (this.slapMode === 'ai' && (time - this.idleTimer) > this.slapTime / 2) {
					slapped = true;
				}
			}
		} else {
			this.idleTimer = time;
		}

		return slapped;
	}

	resetTimers () {
		this.idle = false;
		this.reset = true;
	}

	resetSlap () {
		this.slapping = false;
		this.slapMode = 'player';
	}

	reCheckMoves () {
		this.idle = false;
	}
}

function countCards (stapels) {
	let aantal = 0;
	for (const stapel of stapels) {
		aantal += stapel.cards.length;
	}
	return aantal;
}
