import Phaser from 'phaser';
import { style } from '../style';

export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}

	create () {
		const self = this;

		this.add.text(20, 20, 'Main Menu').setColor(style.colors.textColor.rgba);

		/*
		 * Main Menu button
		 */

		this.startText = this.add.text(1000, 350, ['Start']).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.startText.setFontFamily('sans-serif');

		this.startText.on('pointerdown', function () {
			self.scene.start('game');
		});

		this.startText.on('pointerover', function () {
			self.startText.setColor(style.colors.textHover.rgba);
		});

		this.startText.on('pointerout', function () {
			self.startText.setColor(style.colors.textColor.rgba);
		});

		/*
		 * Info button
		 */

		this.infoText = this.add.text(1000, 370, ['Info']).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.infoText.setFontFamily('sans-serif');

		this.infoText.on('pointerdown', function () {
			self.scene.start('gameInfo');
		});

		this.infoText.on('pointerover', function () {
			self.infoText.setColor(style.colors.textHover.rgba);
		});

		this.infoText.on('pointerout', function () {
			self.infoText.setColor(style.colors.textColor.rgba);
		});
	}
}
