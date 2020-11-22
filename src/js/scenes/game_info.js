import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class GameInfo extends Phaser.Scene {
	constructor () {
		super('gameInfo'); // id of Scene
	}

	preload () {
	}

	create () {
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2; // x for auto center
		this.add.text(screenCenterX, 350, 'Game Info placeholder text', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5);
		this.mainMenu = new TextButton(this, screenCenterX, 700, 230, 100, 'Menu', 30, 6, undefined, undefined, () => this.scene.start('mainMenu'));
	}
}
