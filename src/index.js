import Phaser from 'phaser';
import Scenes from './js/scenes';

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
};

const game = new Phaser.Game(config);
