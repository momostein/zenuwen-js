import Phaser from 'phaser';
import { style } from '../style';
import { TextButton } from '../button';
export default class GameInfo extends Phaser.Scene {
	constructor () {
		super('gameInfo'); // id of Scene
	}

	preload () {
	}

	create () {
		const self = this;

		this.add.text(475, 350, 'Game Info placeholder text', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.mainMenu = new TextButton(this, 600, 700, 230, 100, 'Menu', 30, undefined, undefined, () => this.scene.start('mainMenu'));
	}
}
