import { BackgroundRect } from '../backgroundRect';
import { FullscreenButton } from '../fullscreenButton';
import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
		this.text = '';
		this.color = style.colors.primary;
	}

	init (data) {
		this.scene.remove('game');
		if (data.winner === 'player') {
			this.text = 'Gewonnen';
			this.color = style.colors.victory;
		} else {
			this.text = 'Verloren';
			this.color = style.colors.lost;
		}
	}

	preload () {
	}

	create () {
		const screenCenter =
			{ x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };

		this.fullscreenButton = new FullscreenButton(this);

		this.backgroundRect = new BackgroundRect(this, this.color);

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
