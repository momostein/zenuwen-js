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

let audioscene;

// Preload audio files
export function preloadAudio (scene) {
	// Set the scene
	audioscene = scene;

	// Load audio files
	for (const placeSound of placeSounds) {
		console.debug('loading', placeSound, 'from', `assets/sounds/${placeSound}.wav`);
		audioscene.load.audio(placeSound, `assets/sounds/${placeSound}.wav`);
	}

	for (const dealSound of dealSounds) {
		console.debug('loading', dealSound, 'from', `assets/sounds/${dealSound}.wav`);
		audioscene.load.audio(dealSound, `assets/sounds/${dealSound}.wav`);
	}
}

// Play a card sound
export function	playCardAudio () {
	const placeSound = placeSounds[Math.floor(Math.random() * placeSounds.length)];
	audioscene.sound.play(placeSound);
}

export function playDealSound () {
	const dealSound = dealSounds[Math.floor(Math.random() * dealSounds.length)];
	audioscene.sound.play(dealSound);
}
