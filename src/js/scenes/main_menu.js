import Phaser from 'phaser';
import { style } from '../style';
export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}
	preload(){
	this.load.image("StartSpel","./assets/Menu/startSpel.png");
	this.load.image("spelUitleg","./assets/Menu/spelUitleg.png");
	this.load.image("verlaten","./assets/Menu/verlaten.png");
	this.load.image("title","./assets/Menu/title.png");
	}
	create () {
		const self = this;
		this.add.text(20, 20, 'Main Menu',{fontFamily: 'lemonMilk',}).setColor(style.colors.textColor.rgba);
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 -250, "title").setDepth(1);
		/*MENU with images*/
		this.startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 -50, "StartSpel").setDepth(1);
		this.spelInfo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +100, "spelUitleg").setDepth(1);
		this.spelVerlaten = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +250, "verlaten").setDepth(1);

		//init
		this.startButton.setInteractive();
		this.startButton.setScale(.5);
		this.spelInfo.setInteractive();
		this.spelInfo.setScale(.5);
		this.spelVerlaten.setInteractive();
		this.spelVerlaten.setScale(.5);

		//Start spel
		this.startButton.on('pointerdown', function () {
			self.scene.start('game');
		});

		this.startButton.on('pointerover', function () {
			self.startButton.setScale(0.6);
		});

		this.startButton.on('pointerout', function () {
			self.startButton.setScale(0.5);
		});
		
		//Spel info
		this.spelInfo.on('pointerdown', function () {
			self.scene.start('gameInfo');
		});

		this.spelInfo.on('pointerover', function () {
			self.spelInfo.setScale(0.6);
		});

		this.spelInfo.on('pointerout', function () {
			self.spelInfo.setScale(0.5);
		});

		//Spel verlaten
		this.spelVerlaten.on('pointerdown', function () {
			console.log("Quit game");
		});

		this.spelVerlaten.on('pointerover', function () {
			self.spelVerlaten.setScale(0.6);
		});

		this.spelVerlaten.on('pointerout', function () {
			self.spelVerlaten.setScale(0.5);
		});
	}
}


/**/

