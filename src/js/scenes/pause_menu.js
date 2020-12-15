import { BackgroundRect } from '../backgroundRect';
import { FullscreenButton } from '../fullscreenButton';
import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class PauseMenu extends Phaser.Scene {
	constructor () {
		super('pauseMenu'); // id of Scene
	}

	preload () {
	}

	create () {
		const screenCenter = this.game.config.screenCenter;

		this.fullscreenButton = new FullscreenButton(this);

		this.backgroundRect = new BackgroundRect(this, style.colors.primary);

		this.add.text(screenCenter.x, this.cameras.main.height * 0.235, 'Pauze', { fontFamily: 'lemonMilk', fontSize: 100 }).setColor(style.colors.textColor.rgba).setOrigin(0.5);
		this.continue = new TextButton(this, screenCenter.x, this.cameras.main.height * 0.50, 270, 100, 'Doorgaan', 30, 6, undefined, undefined, () => this.scene.switch('game'));
		this.stop = new TextButton(this, screenCenter.x, this.cameras.main.height * 0.7, 270, 100, 'Stoppen', 30, 6, undefined, undefined, () => {
			this.scene.remove('game');
			this.scene.start('mainMenu');
		});
	}
}
