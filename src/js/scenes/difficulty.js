import Phaser from 'phaser';
import { TextButton } from '../button';
// import { TextBox } from '../textBox';
import { style } from '../style';
import { difficulties } from '../ai';

export default class Difficulty extends Phaser.Scene {
	constructor () {
		super('difficulty'); // id of Scene
	}

	preload () {
	}

	create () {
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };
		this.add.text(screenCenter.x, screenCenter.y * 0.08, 'Moeilijkheidsgraad van AI:', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5).setFontSize(30);

		// Create Current difficulty text
		this.textD = this.add.text(
			screenCenter.x,
			screenCenter.y * 0.3,
			'UNDEFINED',
			{ fontFamily: 'lemonMilk' },
		)
			.setColor(style.colors.textColor.rgba)
			.setOrigin(0.5)
			.setFontSize(72);

		// Set the text to current difficulty
		switch (this.game.config.difficulty) {
			case difficulties.easy:
				this.textD.setText('Makkelijk');
				break;
			case difficulties.normal:
				this.textD.setText('Normaal');
				break;
			case difficulties.hard:
				this.textD.setText('Moeilijk');
				break;
		}

		// Create difficulty buttons
		this.mainMenu = new TextButton(this, screenCenter.x, screenCenter.y * 1.7, 230, 100, 'Menu', 30, 6, undefined, undefined, () => this.scene.start('mainMenu'));
		this.easy = new TextButton(this, screenCenter.x, screenCenter.y * 0.8, 230, 100, 'Makkelijk', 30, 6, undefined, undefined, () => { this.setDifficulty(difficulties.easy); });
		this.medium = new TextButton(this, screenCenter.x, screenCenter.y * 1.1, 230, 100, 'Normaal', 30, 6, undefined, undefined, () => { this.setDifficulty(difficulties.normal); });
		this.hard = new TextButton(this, screenCenter.x, screenCenter.y * 1.4, 230, 100, 'Moeilijk', 30, 6, undefined, undefined, () => { this.setDifficulty(difficulties.hard); });
	}

	setDifficulty (difficulty) {
		// Update current difficulty text
		switch (difficulty) {
			case difficulties.easy:
				this.textD.setText('Makkelijk');
				break;
			case difficulties.normal:
				this.textD.setText('Normaal');
				break;
			case difficulties.hard:
				this.textD.setText('Moeilijk');
				break;
		}

		// Update difficulty setting
		this.game.config.difficulty = difficulty;
	}
}
