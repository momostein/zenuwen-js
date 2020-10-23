import Phaser from 'phaser';
import { helloWorld } from './js/hello_world';
import Scenes from './js/scenes';

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 200,
			},
		},
	},
	// scene: {
	// 	preload,
	// 	create,
	// },
	scene: Scenes,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);

// function preload () {
// 	// this.load.setBaseURL('http://labs.phaser.io'); // Files are now hosted locally

// 	this.load.image('sky', 'assets/phaser-example/skies/space3.png');
// 	this.load.image('logo', 'assets/phaser-example/sprites/phaser3-logo.png');
// 	this.load.image('red', 'assets/phaser-example/particles/red.png');
// 	this.load.atlasXML('playingCards', 'assets/Spritesheets/playingCards.png', 'assets/Spritesheets/playingCards.xml');
// }

// function create () {
// 	this.add.image(400, 300, 'sky');

// 	const particles = this.add.particles('red');

// 	const emitter = particles.createEmitter({
// 		speed: 100,
// 		scale: {
// 			start: 1,
// 			end: 0,
// 		},
// 		blendMode: 'ADD',
// 	});

// 	// const logo = this.physics.add.image(400, 100, 'logo');
// 	const logo = this.physics.add.image(400, 100, 'playingCards', 'cardSpades3.png');

// 	logo.setVelocity(100, 200);
// 	logo.setBounce(1, 1);
// 	logo.setCollideWorldBounds(true);

// 	emitter.startFollow(logo);

// 	helloWorld();
// }
