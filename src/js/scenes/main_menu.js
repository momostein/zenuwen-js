import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}

	create () {
		const self = this;

		this.add.text(20, 20, 'Main Menu').setColor('#030303');

		/*
		 * Main Menu button
		 */

		this.startText = this.add.text(1000, 350, ['Start']).setFontSize(20).setColor('#030303').setInteractive();
		this.startText.setFontFamily('sans-serif');

		this.startText.on('pointerdown', function () {
			self.scene.start('game');
		});

		this.startText.on('pointerover', function () {
			self.startText.setColor('#FF0000');
		});

		this.startText.on('pointerout', function () {
			self.startText.setColor('#030303');
		});

		/*
		 * Info button
		 */

		this.infoText = this.add.text(1000, 370, ['Info']).setFontSize(20).setColor('#030303').setInteractive();
		this.infoText.setFontFamily('sans-serif');

		this.infoText.on('pointerdown', function () {
			self.scene.start('gameInfo');
		});

		this.infoText.on('pointerover', function () {
			self.infoText.setColor('#FF0000');
		});

		this.infoText.on('pointerout', function () {
			self.infoText.setColor('#030303');
		});
	}
}
