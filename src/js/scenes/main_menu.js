import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';
export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}

	preload () {
	}

	create () {
		const self = this;
		this.startButton = new TextButton(this, 600, 400, 230, 100, 'Nieuw Spel', 30, undefined, undefined, () => this.scene.start('game'));
		this.spelInfo = new TextButton(this, 600, 550, 230, 100, 'Spel Info', 30, undefined, undefined, () => this.scene.start('gameInfo'));
		this.exitGame = new TextButton(this, 600, 700, 230, 100, 'Verlaten', 30, undefined, undefined, () => console.log('EXIT GAME'));
		this.add.text(20, 20, 'Main Menu', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(275, 126, 'Zenuwen', { fontFamily: 'lemonMilk', fontSize: 125, color: 'black' });
	}
}
