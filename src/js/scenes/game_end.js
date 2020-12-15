import { BackgroundRect } from '../backgroundRect';
import { FullscreenButton } from '../fullscreenButton';
import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class GameEnd extends Phaser.Scene {
	constructor () {
		super('gameEnd'); // id of Scene
		this.text = '';
		this.rounds = 0;
		this.elaps = 0;
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
		this.rounds = data.rounds;
		this.elaps = data.timeS;
	}

	preload () {
	}

	create () {
		const screenCenter = this.game.config.screenCenter;

		this.fullscreenButton = new FullscreenButton(this);

		this.backgroundRect = new BackgroundRect(this, this.color);

		this.add
			.text(screenCenter.x, screenCenter.y * 0.8, this.text, { fontFamily: 'lemonMilk', fontSize: 100 })
			.setColor(style.colors.textColor.rgba)
			.setOrigin(0.5);
		this.add
			.text(screenCenter.x, screenCenter.y * 1, 'rondes gespleeld: ' + this.rounds, { fontFamily: 'lemonMilk', fontSize: 50 })
			.setColor(style.colors.textColor.rgba)
			.setOrigin(0.5);
		this.add
			.text(screenCenter.x, screenCenter.y * 1.2, 'Duur: ' + this.elaps + ' seconden', { fontFamily: 'lemonMilk', fontSize: 50 })
			.setColor(style.colors.textColor.rgba)
			.setOrigin(0.5);
		this.mainMenu = new TextButton(
			this,
			screenCenter.x,
			750,
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
