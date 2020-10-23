import Phaser from 'phaser';

export class Card extends Phaser.GameObjects.Image {
    constructor (scene,x,y,sprite) {
        super(scene,x,y);
        this.stapel = undefined;
        this.setTexture(sprite);
        this.setScale(1, 1);
        this.setInteractive();
        scene.add.displayList.add(this);
        scene.input.setDraggable(this);
    }
    setStapel(stapel){
        this.stapel =stapel;
    }
    getStapel(){
        return this.stapel;
    }
  }