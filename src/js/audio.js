const debugTag = 'AUDIO:';

const placeSounds = [
	'cardPlace1',
	'cardPlace2',
	'cardPlace3',
	'cardSlide1',
	'cardSlide2',
	'cardSlide3',
];

const dealSounds = [
	// 'cardShuffle1', // Has extra sound of the bridge
	'cardShuffle2',
	'Card_deal',
];

const slapSounds = [
	'tableHit1',
	'tableHit2',
];

// This is so we can save the scene to play sounds
let audioScene;

// Preload audio files
export function preloadAudio (scene) {
	// Set the scene
	audioScene = scene;

	// Load audio files
	for (const placeSound of placeSounds) {
		console.debug(debugTag, 'loading', placeSound, 'from', `assets/sounds/${placeSound}.wav`);
		audioScene.load.audio(placeSound, `assets/sounds/${placeSound}.wav`);
	}

	for (const dealSound of dealSounds) {
		console.debug(debugTag, 'loading', dealSound, 'from', `assets/sounds/${dealSound}.wav`);
		audioScene.load.audio(dealSound, `assets/sounds/${dealSound}.wav`);
	}

	for (const slapSound of slapSounds) {
		console.debug(debugTag, 'loading', slapSound, 'from', `assets/sounds/${slapSound}.wav`);
		audioScene.load.audio(slapSound, `assets/sounds/${slapSound}.wav`);
	}
}

// Play a card sound
export function	playCardAudio () {
	const placeSound = placeSounds[Math.floor(Math.random() * placeSounds.length)];
	audioScene.sound.play(placeSound);
}

export function playDealSound () {
	const dealSound = dealSounds[Math.floor(Math.random() * dealSounds.length)];
	audioScene.sound.play(dealSound);
}

export function playSlapSound () {
	const slapSound = slapSounds[Math.floor(Math.random() * slapSounds.length)];
	audioScene.sound.play(slapSound);
}
