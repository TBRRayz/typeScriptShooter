/**
 * Ball
 */
class Ball {
    private div: HTMLElement;
    
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    
    private level:Level;
    private player:Player;
    
    private speed:number;
    private alive:boolean;
    
  
    constructor(l:Level, p:Player) {
        this.level = l;
        this.player = p;
        
        this.div = document.createElement("ball");
        this.level.div.appendChild(this.div);
        
        this.x = this.player.x + 20;
        this.y = this.player.y;
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.alive = true;
    }
    
    public update() :void{
        this.y-=this.speed;
        
        this.draw();
    } 
    
    public hitDragon() : void{
       console.log('hit');
       if(this.alive){
       this.level.div.removeChild(this.div);
       this.alive = false;
       }
       
    }
    
    
    public draw() : void{
        
       this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)"; 
       
    }
       
}