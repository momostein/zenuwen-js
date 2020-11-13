import Phaser from 'phaser';
import { style } from '../style';

export default class PauseMenu extends Phaser.Scene {
	constructor () {
		super('pauseMenu'); // id of Scene
	}

	preload(){
		this.load.image("continue","./assets/Menu/continue.png");
		}
	create () {
		const self = this;

		this.add.text(20, 20, 'Pause Menu').setColor(style.colors.textColor.rgba);

		this.continue = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +300, "continue").setDepth(1);
		this.continue.setInteractive();
		this.continue.setScale(.4);

		//main Menu
		this.continue.on('pointerdown', function () {
			self.scene.start('game');
		});

		this.continue.on('pointerover', function () {
			self.continue.setScale(0.5);
		});

		this.continue.on('pointerout', function () {
			self.continue.setScale(0.4);
		});

		/*

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
		});*/
	}
}
