import Phaser from 'phaser';

export default class PauseMenu extends Phaser.Scene {
	constructor () {
		super('pauseMenu'); // id of Scene
	}

	create () {
		const self = this;

		this.add.text(20, 20, 'Pause Menu').setColor('#030303');

		/*
		 * Pause button
		 */

		this.continueText = this.add.text(1000, 350, ['Continue']).setFontSize(20).setColor('#030303').setInteractive();
		this.continueText.setFontFamily('sans-serif');

		this.continueText.on('pointerdown', function () {
			this.scene.switch('game');
		}, this);

		this.continueText.on('pointerover', function () {
			self.continueText.setColor('#FF0000');
		});

		this.continueText.on('pointerout', function () {
			self.continueText.setColor('#030303');
		});
	}
}
