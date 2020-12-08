import Phaser from 'phaser';

export class TextBox extends Phaser.GameObjects.Container {
	constructor (
		scene,
		x,
		y,
		width = 1000,
		height = 800,
		text = 'Button',
		fontSize = 15,
		borderWidth = 8,
		textColor = Phaser.Display.Color.HexStringToColor('#2a2a2a'),
		buttonColor = Phaser.Display.Color.HexStringToColor('#fff'),
		image,
		textPosX = -((width / 2) - 75),
		textPosY = 200,
	) {
		super(scene, x, y);
		this.setSize(width, height);

		this.graphic = new Phaser.GameObjects.Graphics(scene);
		this.graphic.fillStyle(buttonColor.color).fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, 10);
		// this.graphic.lineStyle(borderWidth + 2, Phaser.Display.Color.HexStringToColor('#bbbbbb').color).strokeRoundedRect(-this.width / 2 - (borderWidth + 2) / 4, -this.height / 2 - (borderWidth + 2) / 4, this.width + (borderWidth + 2) / 2, this.height + (borderWidth + 2) / 2, 10);
		this.graphic.lineStyle(borderWidth, textColor.color).strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, 10);
		this.add(this.graphic);

		this.text = new Phaser.GameObjects.Text(scene, textPosX, textPosY, text, { wordWrap: { width: width - 100, useAdvancedWrap: true } });
		this.text.setOrigin(0, 0).setColor(textColor.rgba).setFontSize(fontSize).setFontFamily('lemonMilk');
		this.add(this.text);

		scene.add.existing(this);

		if (typeof image !== 'undefined') {
			scene.add.image(10, 10 * 0.75, image).setOrigin(0.5);
		}
	}
}
