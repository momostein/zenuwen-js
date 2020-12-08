import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
		this.text = '';
	}

	init (data) {
		if (data.winner === 'player') {
			this.text = 'Gewonnen';
			this.cameras.main.setBackgroundColor(0xaeffab);
		} else {
			this.text = 'Verloren';
			this.cameras.main.setBackgroundColor(0xffb3b3);
		}
	}

	preload () {
	}

	create () {
		console.log(this.winner);
		const screenCenter =
			{ x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };
		this.add
			.text(screenCenter.x, screenCenter.y * 0.8, this.text, { fontFamily: 'lemonMilk', fontSize: 100 })
			.setColor(style.colors.textColor.rgba)
			.setOrigin(0.5);
		this.mainMenu = new TextButton(
			this,
			screenCenter.x,
			700,
			230,
			100,
			'Menu',
			30,
			6,
			undefined,
			undefined,
			() => this.scene.start('mainMenu'),
		);
	}
}
