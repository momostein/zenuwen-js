import Phaser from 'phaser';

export default class PauseMenu extends Phaser.Scene {
	constructor () {
		super('pauseMenu'); // id of Scene
	}

	create () {
		this.add.text(20, 20, 'Pause Menu');
	}
}
