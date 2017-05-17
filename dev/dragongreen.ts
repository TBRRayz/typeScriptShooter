/**
 * dragonGreen extends Dragons
 * /// <reference path="dragon.ts" />
 
 */
class DragonGreen extends Dragons {
    constructor(l:Level) {
        super(l);
        
        this.speed = 4;
        
        this.div = document.createElement("dragongreen");
        this.level.div.appendChild(this.div);
        
        
        
    }
}