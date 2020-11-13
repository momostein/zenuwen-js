import Phaser from 'phaser';
import { style } from '../style';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
	}
	preload(){
		this.load.image("mainMenu","./assets/Menu/menu.png");
		}
	create () {
		const self = this;

		this.add.text(20, 20, 'Game End',{fontFamily: 'lemonMilk'}).setColor(style.colors.textColor.rgba);

		//this.add.text(475, 350, 'Game Info placeholder text').setColor(style.colors.textColor.rgba);

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

		/*
		this.mainMenuText = this.add.text(1000, 350, ['Main Menu']).setFontSize(20).setColor(style.colors.textColor.rgba).setInteractive();
		this.mainMenuText.setFontFamily('sans-serif');

		this.mainMenuText.on('pointerdown', function () {
			this.scene.start('mainMenu');
		}, this);

		this.mainMenuText.on('pointerover', function () {
			self.mainMenuText.setColor(style.colors.textHover.rgba);
		});

		this.mainMenuText.on('pointerout', function () {
			self.mainMenuText.setColor(style.colors.textColor.rgba);
		});*/
	}
}
