export class AbstractAI {
	constructor (patienceStapelsAI, handstapelAI, patienceStapelsPlayer, handstapelPlayer, aflegStapels, trekStapels) {
		this.patienceStapelsAI = patienceStapelsAI;
		this.handstapelAI = handstapelAI;

		this.patienceStapelsPlayer = patienceStapelsPlayer;
		this.handstapelPlayer = handstapelPlayer;

		this.aflegStapels = aflegStapels;
		this.trekStapels = trekStapels;
	}

	update (time, delta) {
		console.debug('AI update:', time, '\t', delta);
	}
}
