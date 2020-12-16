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

	// Array with all sound names
	const allSounds = placeSounds.concat(dealSounds).concat(slapSounds);

	// Load audio files
	for (const sound of allSounds) {
		const urls = [
			`assets/sounds_compressed/${sound}.ogg`,
			`assets/sounds_compressed/${sound}.mp3`,
		];

		console.debug(debugTag, 'loading', sound, 'from', urls);
		audioScene.load.audio(sound, urls);
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
