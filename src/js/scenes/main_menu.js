import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}

	create () {
		this.add.text(20, 20, 'Main Menu');
	}
}
