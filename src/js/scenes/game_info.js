import Phaser from 'phaser';

export default class GameInfo extends Phaser.Scene {
	constructor () {
		super('gameInfo'); // id of Scene
	}

	create () {
		this.add.text(20, 20, 'Game Info');
	}
}
