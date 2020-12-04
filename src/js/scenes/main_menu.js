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

		this.backgroundRect = new Phaser.GameObjects.Graphics(this);
		this.backgroundRect.fillStyle(Phaser.Display.Color.HexStringToColor('#3f7cb6').color);
		this.backgroundRect.fillRoundedRect(screenCenter.x - (this.cameras.main.width - 400) / 2, screenCenter.y - (this.cameras.main.height - 200) / 2, this.cameras.main.width - 400, this.cameras.main.height - 200, 50);
		this.backgroundRect.lineStyle(10, Phaser.Display.Color.HexStringToColor('#bbbbbb').color).strokeRoundedRect(screenCenter.x - (this.cameras.main.width - 400) / 2 - 2.5, screenCenter.y - (this.cameras.main.height - 200) / 2 - 2.5, this.cameras.main.width - 400 + 5, this.cameras.main.height - 200 + 5, 50);
		this.backgroundRect.lineStyle(5, Phaser.Display.Color.HexStringToColor('#fff').color).strokeRoundedRect(screenCenter.x - (this.cameras.main.width - 400) / 2, screenCenter.y - (this.cameras.main.height - 200) / 2, this.cameras.main.width - 400, this.cameras.main.height - 200, 50);
		this.add.existing(this.backgroundRect);

		this.add.image(screenCenter.x, screenCenter.y * 0.75, 'logo').setOrigin(0.5);

		this.startButton = new TextButton(this, screenCenter.x, screenCenter.y * 1.5, 400, 175, 'Nieuw Spel', 50, 8, undefined, undefined, () => this.scene.start('game'));

		this.spelInfo = new TextButton(this, screenCenter.x * 0.5, screenCenter.y * 1.5, 200, 100, 'Speluitleg', 30, 6, undefined, undefined, () => this.scene.start('gameInfo'));
		this.fullscreen = new TextButton(this, screenCenter.x * 1.5, screenCenter.y * 1.5, 230, 100, 'Fullscreen', 30, 6, undefined, undefined, () => { this.scale.toggleFullscreen(); });
	}
}
