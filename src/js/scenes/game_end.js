import Phaser from 'phaser';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
	}

	create () {
		const self = this;

		this.add.text(20, 20, 'Game End').setColor('#030303');

		/*
		 * Main Menu button
		 */

		this.mainMenuText = this.add.text(1000, 350, ['Main Menu']).setFontSize(20).setColor('#030303').setInteractive();
		this.mainMenuText.setFontFamily('sans-serif');

		this.mainMenuText.on('pointerdown', function () {
			this.scene.start('mainMenu');
		}, this);

		this.mainMenuText.on('pointerover', function () {
			self.mainMenuText.setColor('#FF0000');
		});

		this.mainMenuText.on('pointerout', function () {
			self.mainMenuText.setColor('#030303');
		});
	}
}
