import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';
export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}

	preload () {
		this.load.image('title', './assets/Menu/title.png');
	}

	create () {
		const self = this;
		this.startButton = new TextButton(this, 600, 400, 230, 100, 'Nieuw Spel', 30, undefined, undefined, () => this.scene.start('game'));
		this.startButton = new TextButton(this, 600, 550, 230, 100, 'Spel Info', 30, undefined, undefined, () => this.scene.start('gameInfo'));
		this.startButton = new TextButton(this, 600, 700, 230, 100, 'Verlaten', 30, undefined, undefined, () => this.console.log('EXIT GAME'));
		this.add.text(20, 20, 'Main Menu', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(50, 50, 'Zenuwen', { fontFamily: 'lemonMilk', fontSize: '50' }).setColor('#fff');
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 250, 'title').setDepth(1);
	}
}
