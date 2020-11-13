import Phaser from 'phaser';
import { style } from '../style';

export default class PauseMenu extends Phaser.Scene {
	constructor () {
		super('pauseMenu'); // id of Scene
	}

	create () {
		const self = this;

		this.add.text(20, 20, 'Pause Menu').setColor(style.colors.textColor.rgba);

		/*
		 * Pause button
		 */

		this.continueText = this.add.text(1000, 350, ['Continue']).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.continueText.setFontFamily('sans-serif');

		this.continueText.on('pointerdown', function () {
			this.scene.switch('game');
		}, this);

		this.continueText.on('pointerover', function () {
			self.continueText.setColor(style.colors.textHover.rgba);
		});

		this.continueText.on('pointerout', function () {
			self.continueText.setColor(style.colors.textColor.rgba);
		});
	}
}
