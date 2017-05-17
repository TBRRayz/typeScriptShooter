/**
 * dragonBlue extends Dragon
 * /// <reference path="dragon.ts" />
 
 */


class dragonBlue extends Dragons {
    
   
    constructor(l:Level) {
        super(l);
        
        this.speed = 3;
        
        this.div = document.createElement("dragonblue");
        this.level.div.appendChild(this.div);
        
        
        
    }
    
    
}