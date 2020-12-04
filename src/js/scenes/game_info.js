import Phaser from 'phaser';
import { TextButton } from '../button';
import { TextBox } from '../textBox';
import { style } from '../style';

export default class GameInfo extends Phaser.Scene {
	constructor () {
		super('gameInfo'); // id of Scene
	}

	preload () {
		this.load.image('cardback', 'assets/PNG/Cards/cardBack_green3.png');
		this.load.image('2', 'assets/PNG/SpelInfo/1.png');
		this.load.image('3', 'assets/PNG/SpelInfo/2.png');
		this.load.image('4', 'assets/PNG/SpelInfo/3.png');
		this.load.image('5', 'assets/PNG/SpelInfo/4.png');
		this.load.image('6', 'assets/PNG/SpelInfo/5.png');
		this.load.image('logo', '../../../assets/logo.png');
	}

	create () {
		this.regelArray = [];
		this.menuPosition = 0;
		var img1 = this.add.image(0, -100, 'logo').setScale(0.45);
		var img2 = this.add.image(0, -100, '2').setScale(0.45);
		var img3 = this.add.image(0, -100, '3').setScale(0.45);
		var img4 = this.add.image(0, -100, '4').setScale(0.45);
		var img5 = this.add.image(0, -100, '5').setScale(0.45);
		var img6 = this.add.image(0, -100, '6').setScale(0.45);
		const screenCenter = { x: this.cameras.main.worldView.x + this.cameras.main.width / 2, y: this.cameras.main.worldView.y + this.cameras.main.height / 2 };
		this.add.text(screenCenter.x, screenCenter.y * 0.08, 'Spelregels:', { fontFamily: 'lemonMilk' }).setColor(style.colors.textColor.rgba).setOrigin(0.5).setFontSize(30);
		this.Box1 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '1. Het doel van het spel is om zo snel mogelijk alle kaarten kwijt te spelen.', 18, 6, undefined, undefined);
		this.Box1.add(img1);
		this.regelArray.push(this.Box1);
		this.Box2 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '2. De kaarten worden verdeeld in twee trekstapels en vanuit de trekstapels worden er 5 patiencestapels gemaakt voor iedere speler.', 18, 6, undefined, undefined);
		this.Box2.add(img2);
		this.regelArray.push(this.Box2);
		this.Box3 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '3. De speler kan op de trekstapels klikken om het spel te starten. Er worden dan twee aflegstapels gemaakt waarop de speler kaarten van zijn patiencestapels kan leggen. ', 18, 6, undefined, undefined);
		this.Box3.add(img3);
		this.regelArray.push(this.Box3);
		this.Box4 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '4. De speler kan kaarten kwijtgeraken door kaarten van zijn patiencestapels op de aflegstapels te leggen. Men kan een kaart afleggen op een andere kaart met een waarde die er aan grenst. Bijvoorbeeld een 3 op een 2 of een 2 op een Aas. Er wordt een groene kader rond een geldige afleglocatie getekend.', 18, 6, undefined, undefined);
		this.Box4.add(img4);
		this.regelArray.push(this.Box4);
		this.Box5 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '5. Men kan kaarten tussen patiencestapels verplaatsen en op elkaar leggen als deze dezelfde waarde hebben. Ook kan men andere kaarten op lege patiencestapels leggen.', 18, 6, undefined, undefined);
		this.Box5.add(img5);
		this.regelArray.push(this.Box5);
		this.Box6 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '6. Als de speler en Ai geen kaarten meer kunnen leggen dan kan men op een trekstapel drukken om een nieuwe kaart op de aflegstapel te leggen.', 18, 6, undefined, undefined);
		this.Box6.add(img6);
		this.regelArray.push(this.Box6);
		this.Box7 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '7. Als de speler of Ai geen kaarten meer in zijn Patience stapels heeft, dan moeten deze zo snel mogelijk op een aflegstapel klikken. Deze nieuwe aflegstapel wordt dan gebruikt om nieuwe patiencestapels te maken.', 18, 6, undefined, undefined);
		this.regelArray.push(this.Box7);
		this.Box8 = new TextBox(this, screenCenter.x, screenCenter.y * 0.85, 1500, 750, '8. Men wint als men op een lege aflegstapel kan klikken en dus geen extra kaarten meer over heeft in de trekstapel en patiencestapel.', 18, 6, undefined, undefined);
		this.regelArray.push(this.Box8);
		this.mainMenu = new TextButton(this, screenCenter.x, screenCenter.y * 1.7, 230, 100, 'Menu', 30, 6, undefined, undefined, () => this.scene.start('mainMenu'));
		this.back = new TextButton(this, screenCenter.x * 0.5, screenCenter.y * 1.7, 200, 100, 'Vorige', 30, 6, undefined, undefined, () => { this.backFunc(); });
		this.next = new TextButton(this, screenCenter.x * 1.5, screenCenter.y * 1.7, 230, 100, 'Volgende', 30, 6, undefined, undefined, () => { this.nextFunc(); });
		this.back.visible = false;
		this.allOff();
		this.turnOn(this.menuPosition);
	}

	allOff () {
		for (var i = 0; i < this.regelArray.length; i++) {
			this.regelArray[i].visible = false;
		}
	}

	turnOn (index) {
		this.regelArray[index].visible = true;
	}

	nextFunc () {
		this.allOff();
		if (this.menuPosition < this.regelArray.length - 1) {
			this.menuPosition++;
			if (this.menuPosition > 0) {
				this.back.visible = true;
			}
			if (this.menuPosition >= this.regelArray.length - 1) {
				this.next.visible = false;
			}
			this.turnOn(this.menuPosition);
		}
	}

	backFunc () {
		this.allOff();
		if (this.menuPosition > 0) {
			this.menuPosition--;
			if (this.menuPosition < this.regelArray.length - 1) {
				this.next.visible = true;
			}
			if (this.menuPosition < 1) {
				this.back.visible = false;
			}
			this.turnOn(this.menuPosition);
		}
	}
}
