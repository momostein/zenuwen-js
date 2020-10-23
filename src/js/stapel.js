import Phaser from 'phaser';

export class Stapel extends Phaser.GameObjects.Zone{
    constructor(scene, x,y,width,height){
        super(scene, x, y, width, height);
        scene.add.existing(this);
        this.setRectangleDropZone(width, height);
        this.cards = []; 
        this.dropZoneOutline = scene.add.graphics();
        this.dropZoneOutline.lineStyle(4,0xff0000);
        this.dropZoneOutline.strokeRect(x-width/2, y-height/2,width,height);
    }

    addCard(card){
        if(this.getNumberOfCards()!=0){
            this.cards[this.getNumberOfCards()-1].disableInteractive();
        }
        this.cards.push(card);
        this.dropZoneOutline.setPosition( this.dropZoneOutline.x , this.dropZoneOutline.y+20)
        this.setPosition( this.x , this.y+20)
    }

    popCard(){
        this.cards.pop();
        if(this.getNumberOfCards()!=0){
            this.cards[this.getNumberOfCards()-1].setInteractive();
        }
        this.setPosition( this.x , this.y-20)
        this.dropZoneOutline.setPosition( this.dropZoneOutline.x , this.dropZoneOutline.y-20)


    }

    getNumberOfCards(){
        return this.cards.length;
    }

    containsCard(card){
        return (this.cards.includes(card));
    }
};
