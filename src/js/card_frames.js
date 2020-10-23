export default function getCardFrame (value, suit) {
	const valueString = getValueString(value);

	if (valueString === 'Joker') {
		return 'card' + valueString + '.png';
	}

	const suitString = getSuitString(suit);

	return 'card' + suitString + valueString + '.png';
}

function getSuitString (suit) {
	switch (suit.toUpperCase()) {
		case 'C':
			return 'Clubs';
		case 'D':
			return 'Diamonds';
		case 'H':
			return 'Hearts';
		case 'S':
			return 'Spades';

		default:
			throw new Error('Invalid card suit');
	}
}

function getValueString (value) {
	if (value >= 2 && value <= 10) {
		return value.toString();
	} else {
		switch (value) {
			case 1:
				return 'A';
			case 11:
				return 'J';
			case 12:
				return 'Q';
			case 13:
				return 'K';
			case -1:
				return 'Joker';
			default:
				throw new Error('Invalid card value');
		}
	}
}
