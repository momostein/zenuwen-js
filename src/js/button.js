import Phaser from 'phaser';

// import { style } from '../style';

export class TextButton extends Phaser.GameObjects.Container {
	constructor (scene, text, options, event) {
		super(scene);
		this.options = options;

		this.setSize(options.width, options.height);
		this.setPosition(options.x, options.y);

		this.graphic = new Phaser.GameObjects.Graphics(scene);
		this.graphic.fillRoundedRect(-this.options.width / 2, -this.options.height / 2, this.options.width, this.options.height, 10);
		this.add(this.graphic);

		this.text = new Phaser.GameObjects.Text(scene, 0, 0, text);
		this.text.setOrigin(0.5);
		this.add(this.text);

		this.enterButtonRestState();

		this.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.enterButtonHoverState())
			.on('pointerout', () => this.enterButtonRestState())
			.on('pointerup', () => {
				this.enterButtonHoverState();
				event();
			});

		scene.add.existing(this);
	}

	enterButtonRestState () {
		this.graphic.fillStyle(this.options.buttonColor.rest.color);
		this.text.setColor(this.options.textColor.rest);
	}

	enterButtonHoverState () {
		this.graphic.fillStyle(this.options.buttonColor.hover.color);
		this.text.setColor(this.options.textColor.hover);
	}
}
