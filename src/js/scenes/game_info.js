import Phaser from 'phaser';
import { TextButton } from '../button';
import { style } from '../style';

export default class GameInfo extends Phaser.Scene {
	constructor () {
		super('gameInfo'); // id of Scene
	}

	preload () {
		this.load.image('cardback', 'assets/PNG/Cards/cardBack_green3.png');
	}

	create () {
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2; // x for auto center
		this.add.text(screenCenterX, 100, 'Spelregels:', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5);
		this.add.text(100, 125, '1. Het doel van het spel is om zo snel mogelijk alle kaarten kwijt te spelen.', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 175, '2. De kaarten worden verdeeld in twee trekstapels en vanuit de trekstapels worden er 5 patiencestapels gemaakt voor iedere speler.', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 225, '3. De speler kan op de trekstapels klikken om het spel te starten. Er worden dan twee aflegstapels gemaakt waarop de speler kaarten van zijn patience stapels kan leggen. ', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 275, '4. Men kan kaarten tussen patiencestapels verplaatsen en op elkaar leggen als deze dezelfde waarde hebben. ', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 325, '5. De speler kan kaarten kwijtgeraken door kaarten van zijn patiencestapels op de aflegstapels te leggen.', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 350, '    Men een kaart afleggen op een andere kaart met een waarde die er aan grenst. Bijvoorbeeld een 5 op een 6 of een 2 op een Aas.', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 400, '6. Als de speler of Ai geen kaarten meer in zijn Patience stapels heeft, dan moeten deze zo snel mogelijk op een aflegstapel klikken.', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 425, '    Deze nieuwe aflegstapel wordt dan gebruikt om nieuwe patiencestapels te maken.', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.add.text(100, 475, '7. Men wint als men op een lege aflegstapel kan klikken en dus geen extra kaarten meer over heeft in de trekstapel en patiencestapel.', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba);
		this.mainMenu = new TextButton(this, screenCenterX, 850, 230, 100, 'Menu', 30, 6, undefined, undefined, () => this.scene.start('mainMenu'));
	}
}
