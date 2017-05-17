/// <reference path="dragon.ts"/>
/// <reference path="player.ts"/>
/// <reference path="ball.ts" />
/// <reference path="utils.ts" />
/// <reference path="view.ts" />





class Level {
    
    public div: HTMLElement;
    
    public dragonsArry: Array<Dragons> = new Array<Dragons>();
    
    
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    
    private game:Game;
    private dragon:Dragons;
    private player:Player;
    
    public playBal:boolean;
    public ballArry: Array<Ball> = new Array<Ball>();
    
    private utils:Utils;
    
    private timeid:number;
    
    public points:number;
    public lives:number;
    private dragonCount:number;
    private intervalTime:number;
    private random:number;
     
    private pointsText : HTMLElement;
    private livesText : HTMLElement;
 
    private shoot:boolean;
    
    
    
    
    constructor(g:Game) {
        
        this.game = g;
       
               
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        
        this.pointsText = document.createElement("text");
        document.body.appendChild(this.pointsText);
        
        this.livesText = document.createElement("text2");
        document.body.appendChild(this.livesText);
        
        
        
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
        
         this.playBal = false;
         this.utils = new Utils();
         this.dragonCount = 0;
         this.intervalTime = 2000;
         this.points = 0;
         this.lives = 10;
       
         this.shoot = true;
       
         this.timeid = setInterval(this.createDragon.bind(this), this.intervalTime);
         
        
         this.player = new Player(this);
        
        
    }
    
   private createDragon(): void{
       
       this.random = Math.floor(Math.random() * 3) + 1  ;
       if(this.random <= 1)
       {
       this.dragonsArry.push(new dragonRed(this));
       }else if(this.random > 2)
       {
       this.dragonsArry.push(new DragonGreen(this));
       }else
       {
       this.dragonsArry.push(new dragonBlue(this));
       }
       this.dragonCount ++;
       console.log(this.random);
       
   }
   
   private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
           
           case 32: //space
                if(this.shoot == true){
                this.shootBall();
                this.shoot = false;
                }
                
                break;
        }
    }
    
    private shootBall() :void{
      
      this.ballArry.push(new Ball(this, this.player));
      if(this.playBal == false){
      this.playBal = true;
      }    
    }
    
    
    
    public update() : void {
        //schtrijf de score en levens op
        this.player.move();
        this.player.update();
        this.pointsText.innerHTML = "points: " + this.points + "";
        this.livesText.innerHTML = "lives: " + this.lives + "";
      
        
        if(this.shoot == false){
            
            this.shoot = true;
          
            
        }
        if(this.lives <= 0){
            this.removeView();
            this.game.showEndView();
        }
        for (var i = 0; i < this.dragonsArry.length; i++) {
            
            this.dragonsArry[i].update();
            
        }
        
        if(this.playBal == true){
           for (var i = 0; i < this.ballArry.length; i++) {
            
             this.ballArry[i].update();
        } 
        }
       // colision tussen de bal en de draak
       for(var i = 0; i < this.dragonsArry.length; i ++){
                
        for (var b of this.ballArry) {
            
            if(this.utils.hasOverlap(b, this.dragonsArry[i])){
                
                this.dragonsArry[i].dragonHit();
                
                
                }    
            }
       }  
    }
    
    public draw() : void {
        
        this.player.draw();
        
        
    }
    
    private removeView():void {
        // door de container weg te halen, verdwijnt ook alles dat daarin zat (de tekst en de knop)
        this.div.remove();
        
    }
}