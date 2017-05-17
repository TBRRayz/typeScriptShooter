/**
 * dragonRed extends Dragon
 * /// <reference path="dragon.ts" />
 
 */

class dragonRed extends Dragons {
    
   
    constructor(l:Level) {
        super(l);
        
        this.speed = 2;
        
        this.div = document.createElement("dragonred");
         this.level.div.appendChild(this.div);
        
        
        
    }
    
    
}