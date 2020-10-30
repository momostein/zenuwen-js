import Phaser from 'phaser';
import { style } from '../style';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
	}

	create () {
		const self = this;

		this.add.text(20, 20, 'Game End').setColor(style.colors.textColor);

		/*
		 * Main Menu button
		 */

		this.mainMenuText = this.add.text(1000, 350, ['Main Menu']).setFontSize(20).setColor(style.colors.textColor).setInteractive();
		this.mainMenuText.setFontFamily('sans-serif');

		this.mainMenuText.on('pointerdown', function () {
			this.scene.start('mainMenu');
		}, this);

		this.mainMenuText.on('pointerover', function () {
			self.mainMenuText.setColor(style.colors.textHover);
		});

		this.mainMenuText.on('pointerout', function () {
			self.mainMenuText.setColor(style.colors.textColor);
		});
	}
}