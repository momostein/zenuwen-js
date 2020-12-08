import { BackgroundRect } from '../backgroundRect';
import Game from '../scenes/game';
import Phaser from 'phaser';
import { TextButton } from '../button';

export default class MainMenu extends Phaser.Scene {
	constructor () {
		super('mainMenu'); // id of Scene
	}

	preload () {
		this.load.image('logo', '../../../assets/logo.png');
	}

	create () {
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };

		this.backgroundRect = new BackgroundRect(this, Phaser.Display.Color.HexStringToColor('#3f7cb6'));

		this.add.image(screenCenter.x, screenCenter.y * 0.75, 'logo').setOrigin(0.5);

		this.startButton = new TextButton(this, screenCenter.x, screenCenter.y * 1.5, 400, 175, 'Nieuw Spel', 50, 8, undefined, undefined, () => {
			this.scene.add('game', new Game());
			this.scene.start('game');
		});

		this.spelInfo = new TextButton(this, screenCenter.x * 0.5, screenCenter.y * 1.5, 230, 100, 'Speluitleg', 30, 6, undefined, undefined, () => this.scene.start('gameInfo'));
		this.fullscreen = new TextButton(this, screenCenter.x * 1.5, screenCenter.y * 1.5, 250, 100, 'Niveau', 30, 6, undefined, undefined, () => this.scene.start('difficulty'));
	}
}
