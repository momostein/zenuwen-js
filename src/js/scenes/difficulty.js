import Phaser from 'phaser';
import { TextButton } from '../button';
import { TextBox } from '../textBox';
import { style } from '../style';

export default class Difficulty extends Phaser.Scene {
	constructor () {
		super('difficulty'); // id of Scene
	}

	preload () {
	}

	create () {
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };
		this.add.text(screenCenter.x, screenCenter.y * 0.08, 'Moeilijkheidsgraad van AI:', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5).setFontSize(30);
		var textD;
		if (this.game.config.difficulty === 1) {
			this.textD =	this.add.text(screenCenter.x, screenCenter.y * 0.3, 'easy', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5).setFontSize(30);
		} else if (this.game.config.difficulty === 2) {
			this.textD =	this.add.text(screenCenter.x, screenCenter.y * 0.3, 'normal', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5).setFontSize(30);
		} else {
			this.textD =	this.add.text(screenCenter.x, screenCenter.y * 0.3, 'hard', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5).setFontSize(30);
		}
		this.mainMenu = new TextButton(this, screenCenter.x, screenCenter.y * 1.7, 230, 100, 'Menu', 30, 6, undefined, undefined, () => this.scene.start('mainMenu'));
		this.easy = new TextButton(this, screenCenter.x, screenCenter.y * 0.8, 230, 100, 'Easy', 30, 6, undefined, undefined, () => { this.setDifficulty('easy'); });
		this.medium = new TextButton(this, screenCenter.x, screenCenter.y * 1.1, 230, 100, 'Normal', 30, 6, undefined, undefined, () => { this.setDifficulty('normal'); });
		this.hard = new TextButton(this, screenCenter.x, screenCenter.y * 1.4, 230, 100, 'Hard', 30, 6, undefined, undefined, () => { this.setDifficulty('hard'); });
	}

	setDifficulty (diff) {
		if (diff === 'hard') {
			this.game.config.difficulty = 3;
			this.textD.setText('Hard');
		} else if (diff === 'normal') {
			this.game.config.difficulty = 2;
			this.textD.setText('Normal');
		} else {
			this.game.config.difficulty = 1;
			this.textD.setText('easy');
		}
	}
}
