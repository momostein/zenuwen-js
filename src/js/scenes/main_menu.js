import { BackgroundRect } from '../backgroundRect';
import { FullscreenButton } from '../fullscreenButton';
import Game from '../scenes/game';
import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}

	preload () {
		this.load.image('logo', '../../../assets/logo.png');
		this.load.image('fullscreenIcon', '../../assets/fullscreen.png');
	}

	create () {
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };

		this.fullscreenButton = new FullscreenButton(this);

		this.backgroundRect = new BackgroundRect(this, style.colors.primary);

		this.add.image(screenCenter.x, screenCenter.y * 0.75, 'logo').setOrigin(0.5);

		this.startButton = new TextButton(this, screenCenter.x, screenCenter.y * 1.5, 400, 175, 'Nieuw Spel', 50, 8, undefined, undefined, () => {
			this.scene.add('game', new Game());
			this.scene.start('game');
		});

		this.spelInfo = new TextButton(this, screenCenter.x * 0.5, screenCenter.y * 1.5, 230, 100, 'Speluitleg', 30, 6, undefined, undefined, () => this.scene.start('gameInfo'));
		this.fullscreen = new TextButton(this, screenCenter.x * 1.5, screenCenter.y * 1.5, 250, 100, 'Niveau', 30, 6, undefined, undefined, () => this.scene.start('difficulty'));
	}
}
