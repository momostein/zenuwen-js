import Phaser from 'phaser';
import Scenes from './js/scenes';
import { style } from './js/style';

var config = {
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
var game = new Phaser.Game(config);
game.config.difficulty = 1;
