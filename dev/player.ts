/// <reference path="ball.ts" />


/**
 * Player
 */
class Player {
    private div: HTMLElement;
    
    public x:number;
    public y:number;
    
    private directionX: number = 0;
    private directionY: number = 0;
    
    public width:number;
    public height:number;
    
    private speed: number = 0;
    
    private level:Level;

    constructor(l:Level) {
        this.level = l;
        
        this.div = document.createElement("player");
        this.level.div.appendChild(this.div);
        
        this.directionX = 0;
        this.directionY = 0;
        this.speed      = 5;
        
        this.x = 400;
        this.y = 640;
        this.width = 61;
        this.height = 102;
        
        
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
        
    }
    
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
            
            case 39: //RIGHT
                this.directionX = 1;
                break;
            
            case 37: //LEFT
                this.directionX = -1;
                break;
        }
        
    }
     private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
           
            case 39: //RIGHT
                this.directionX = 0;
                break;
            
            case 37: //LEFT
                this.directionX = 0;
                break;
        }
    }
    public move() : void {
        this.x = this.x + this.speed * this.directionX;
        this.y = this.y + this.speed * this.directionY;
    
    }
    
    
    public update() : void {
        
        if(this.x <= 0){
            this.speed = 0;
            this.x = 1;
        }else if(this.x >= 960){
            this.speed = 0;
            this.x = 959;     
        }else{
           this.speed = 5; 
        }
        
        
    }
    
    public draw() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }
}