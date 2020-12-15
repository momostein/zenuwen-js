import Phaser from 'phaser';

export class BackgroundRect extends Phaser.GameObjects.Graphics {
	constructor (scene, backgroundColor) {
		super(scene);

		const screenCenter = { x: scene.cameras.main.worldView.x + scene.cameras.main.width / 2, y: scene.cameras.main.worldView.y + scene.cameras.main.height / 2 };

		this.fillStyle(backgroundColor.color);
		this.fillRoundedRect(screenCenter.x - (scene.cameras.main.width * 0.8) / 2, screenCenter.y - (scene.cameras.main.height * 0.8) / 2, scene.cameras.main.width * 0.8, scene.cameras.main.height * 0.8, 50);
		this.lineStyle(10, Phaser.Display.Color.HexStringToColor('#bbbbbb').color).strokeRoundedRect(screenCenter.x - (scene.cameras.main.width * 0.8) / 2 - 2.5, screenCenter.y - (scene.cameras.main.height * 0.8) / 2 - 2.5, scene.cameras.main.width * 0.8 + 5, scene.cameras.main.height * 0.8 + 5, 50);
		this.lineStyle(5, Phaser.Display.Color.HexStringToColor('#fff').color).strokeRoundedRect(screenCenter.x - (scene.cameras.main.width * 0.8) / 2, screenCenter.y - (scene.cameras.main.height * 0.8) / 2, scene.cameras.main.width * 0.8, scene.cameras.main.height * 0.8, 50);

		scene.add.existing(this);
	}
}
