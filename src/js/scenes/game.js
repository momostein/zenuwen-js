import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
	constructor () {
		super('game'); // id of Scene
	}

	create () {
		this.add.text(20, 20, 'Game');
	}
}
