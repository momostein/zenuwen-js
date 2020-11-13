import Phaser from 'phaser';
import { style } from '../style';

export default class GameInfo extends Phaser.Scene {
	constructor () {
		super('gameInfo'); // id of Scene
	}
	preload(){
		this.load.image("mainMenu","./assets/Menu/menu.png");
		}

	create () {
		const self = this;

		this.add.text(475, 350, 'Game Info placeholder text',{fontFamily: 'lemonMilk',}).setColor(style.colors.textColor.rgba);

		this.mainMenu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +300, "mainMenu").setDepth(1);
		this.mainMenu.setInteractive();
		this.mainMenu.setScale(.4);

		//main Menu
		this.mainMenu.on('pointerdown', function () {
			self.scene.start('mainMenu');
		});

		this.mainMenu.on('pointerover', function () {
			self.mainMenu.setScale(0.5);
		});

		this.mainMenu.on('pointerout', function () {
			self.mainMenu.setScale(0.4);
		});
	}
}
