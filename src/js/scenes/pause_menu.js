import { BackgroundRect } from '../backgroundRect';
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
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };

		this.backgroundRect = new BackgroundRect(this, style.colors.primary);

		this.add.text(screenCenter.x, this.cameras.main.height * 0.235, 'Pauze', { fontFamily: 'lemonMilk', fontSize: 100 }).setColor(style.colors.textColor.rgba).setOrigin(0.5);
		this.continue = new TextButton(this, screenCenter.x, this.cameras.main.height * 0.45, 270, 100, 'Doorgaan', 30, 6, undefined, undefined, () => this.scene.switch('game'));
		this.stop = new TextButton(this, screenCenter.x, this.cameras.main.height * 0.6, 270, 100, 'Stoppen', 30, 6, undefined, undefined, () => {
			this.scene.remove('game');
			this.scene.start('mainMenu');
		});
		this.fullscreen = new TextButton(this, screenCenter.x, this.cameras.main.height * 0.8, 270, 100, 'Fullscreen', 30, 6, undefined, undefined, () => this.scale.toggleFullscreen());
	}
}
