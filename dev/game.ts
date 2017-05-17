/// <reference path="level.ts"/>

class Game {
    
     
    private level:Level;
    private currentView:View;
     
    constructor() {
        
         this.level = new Level(this);
         this.showStartView();
        
    }
   
    
    public showStartView():void {
        this.currentView = new StartView(this);
    }

    public showLevelView():void {
        
        requestAnimationFrame(this.gameLoop.bind(this));
        
    }
     private gameLoop(){
        
        this.level.update();
        this.level.draw();
         
        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this));
        
       
    }

    public showEndView():void {
        cancelAnimationFrame(this.gameLoop.bind(this));
        this.currentView = new EndView(this);
    }
}


