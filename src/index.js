import Phaser from 'phaser';
import Scenes from './js/scenes';
import { difficulties } from './js/ai';
import { style } from './js/style';

const config = {
	type: Phaser.AUTO,
	scale: {
		width: 1920,
		height: 1080,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	// scene: {
	// 	preload,
	// 	create,
	// },
	scene: Scenes,
	backgroundColor: style.colors.background,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);

// Set default difficulty to easy
game.config.difficulty = difficulties.easy;
game.config.screenCenter = { x: config.scale.width / 2, y: config.scale.height / 2 };
