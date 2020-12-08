import Phaser from 'phaser';
import { TextButton } from '../button';
import { difficulties } from '../ai';
import { style } from '../style';

const selectedColor = '#CCC';

export default class Difficulty extends Phaser.Scene {
	constructor () {
		super('difficulty'); // id of Scene
	}

	preload () {
	}

	create () {
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };
		this.add.text(screenCenter.x, screenCenter.y * 0.2, 'Moeilijkheidsgraad van AI:', { fontFamily: 'lemonMilk' })
			.setColor(style.colors.textColor.rgba)
			.setOrigin(0.5)
			.setFontSize(30);

		this.mainMenu = new TextButton(this, screenCenter.x, screenCenter.y * 1.7, 230, 100, 'Menu', 30, 6, undefined, undefined, () => this.scene.start('mainMenu'));
		this.easy = new TextButton(this, screenCenter.x, screenCenter.y * 0.5, 230, 100, 'Makkelijk', 30, 6, undefined, undefined, () => { this.setDifficulty(difficulties.easy); });
		this.medium = new TextButton(this, screenCenter.x, screenCenter.y * 0.8, 230, 100, 'Normaal', 30, 6, undefined, undefined, () => { this.setDifficulty(difficulties.normal); });
		this.hard = new TextButton(this, screenCenter.x, screenCenter.y * 1.1, 230, 100, 'Moeilijk', 30, 6, undefined, undefined, () => { this.setDifficulty(difficulties.hard); });

		this.setDifficulty(this.game.config.difficulty);
	}

	setDifficulty (difficulty) {
		// Update update active button
		switch (difficulty) {
			case difficulties.easy:
				this.easy.setBackgroundColor(Phaser.Display.Color.HexStringToColor(selectedColor));
				this.medium.setBackgroundColor(Phaser.Display.Color.HexStringToColor('#fff'));
				this.hard.setBackgroundColor(Phaser.Display.Color.HexStringToColor('#fff'));
				break;
			case difficulties.normal:
				this.easy.setBackgroundColor(Phaser.Display.Color.HexStringToColor('#fff'));
				this.medium.setBackgroundColor(Phaser.Display.Color.HexStringToColor(selectedColor));
				this.hard.setBackgroundColor(Phaser.Display.Color.HexStringToColor('#fff'));
				break;
			case difficulties.hard:
				this.easy.setBackgroundColor(Phaser.Display.Color.HexStringToColor('#fff'));
				this.medium.setBackgroundColor(Phaser.Display.Color.HexStringToColor('#fff'));
				this.hard.setBackgroundColor(Phaser.Display.Color.HexStringToColor(selectedColor));
				break;
		}

		// update difficulty setting
		this.game.config.difficulty = difficulty;
	}
}
