const placeSounds = [
	'cardPlace1',
	'cardPlace2',
	'cardPlace3',
	'cardSlide1',
	'cardSlide2',
	'cardSlide3',
];

const placeFXs = [];

// Preload audio files
export function preloadAudio (scene) {
	// Load audio files
	// scene.load.audio('cardPlace1', 'assets/Bonus/cardPlace1.ogg');
	// scene.load.audio('cardPlace2', 'assets/Bonus/cardPlace2.ogg');
	// scene.load.audio('cardPlace3', 'assets/Bonus/cardPlace3.ogg');

	// scene.load.audio('cardSlide1', 'assets/Bonus/cardSlide1.ogg');
	// scene.load.audio('cardSlide2', 'assets/Bonus/cardSlide2.ogg');
	// scene.load.audio('cardSlide3', 'assets/Bonus/cardSlide3.ogg');

	for (const placeSound of placeSounds) {
		console.log('loading', placeSound, 'from', `assets/Bonus/${placeSound}.ogg`);
		scene.load.audio(placeSound, `assets/Bonus/${placeSound}.ogg`);
	}
}

// Play a card sound
export function	playCardAudio (scene) {
	const placeSound = placeSounds[Math.floor(Math.random() * placeSounds.length)];
	scene.sound.play(placeSound);
}
