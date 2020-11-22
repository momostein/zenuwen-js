import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
	}

	preload () {
	}

	create () {
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2; // x for auto center
		this.add.text(20, 20, 'Game End', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.mainMenu = new TextButton(this, screenCenterX, 700, 230, 100, 'Menu', 30, 6, undefined, undefined, () => this.scene.start('mainMenu'));
	}
}
