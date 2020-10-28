export class abstractStapel {
    constructor() {
        if (this.constructor === abstractStapel) {
            throw new TypeError('Abstract class "abstractStapel" cannot be instantiated directly.'); 
        }
    }
    getSize(){
        throw new Error('You have to implement the method getSize in your class!');
     }
     getTopCard(){
        throw new Error('You have to implement the method getTopCard in your class!');
     }
     popCard(){
        throw new Error('You have to implement the method popCard in your class!');
     }
     checkCard(){
        throw new Error('You have to implement the method checkCard in your class!');
     }
     addCard(){
        throw new Error('You have to implement the method addCard in your class!');
     }
     draw(){
        console.log("Drawing test of inheritance");
     }
}

export class aflegStapel extends abstractStapel {
   addCard(){
      console.log("Test");
   }
}
