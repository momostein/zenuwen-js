import Phaser from 'phaser';

export class FullscreenButton extends Phaser.GameObjects.Image {
	constructor (scene) {
		super(scene, scene.cameras.main.width - 50, 50, 'fullscreenIcon');

		this.setScale(0.05);

		scene.add.existing(this);

		this.setInteractive({ useHandCursor: true })
			.on('pointerup', () => scene.scale.toggleFullscreen())
			.on('pointerover', () => this.setScale(0.06))
			.on('pointerout', () => this.setScale(0.05));
	}
}
