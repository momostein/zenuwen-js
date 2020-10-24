import Phaser from 'phaser';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
	}

	create () {
		this.add.text(20, 20, 'Game End');
	}
}
