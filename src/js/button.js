import Phaser from 'phaser';

export class TextButton extends Phaser.GameObjects.Container {
	constructor (
		scene,
		x,
		y,
		width = 100,
		height = 50,
		text = 'Button',
		fontSize = 20,
		borderWidth = 8,
		textColor = Phaser.Display.Color.HexStringToColor('#2a2a2a'),
		buttonColor = Phaser.Display.Color.HexStringToColor('#fff'),
		event,
	) {
		super(scene, x, y);
		this.setSize(width, height);

		this.graphic = new Phaser.GameObjects.Graphics(scene);
		this.graphic.fillStyle(buttonColor.color).fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, 10);
		// this.graphic.lineStyle(borderWidth + 2, Phaser.Display.Color.HexStringToColor('#bbbbbb').color).strokeRoundedRect(-this.width / 2 - (borderWidth + 2) / 4, -this.height / 2 - (borderWidth + 2) / 4, this.width + (borderWidth + 2) / 2, this.height + (borderWidth + 2) / 2, 10);
		this.graphic.lineStyle(borderWidth, textColor.color).strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, 10);
		this.add(this.graphic);

		this.text = new Phaser.GameObjects.Text(scene, 0, 0, text);
		this.text.setOrigin(0.5).setColor(textColor.rgba).setFontSize(fontSize).setFontFamily('lemonMilk');
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
		this.setScale(1);
	}

	enterButtonHoverState () {
		this.setScale(1.2);
	}
}
