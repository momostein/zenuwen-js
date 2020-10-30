import Phaser from 'phaser';
import Scenes from './js/scenes';
import { style } from './js/style';

const config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 800,
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
