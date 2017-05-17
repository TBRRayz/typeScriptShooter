/**
 * Dragons
 
 
 */
class Dragons {
    public div: HTMLElement;
    
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    
    protected level:Level;
    private alive:boolean;
    
    protected speed:number;
    
    constructor(l:Level) {
        this.level = l;
        
       
        
        
        this.alive = true;
        
        this.x = Math.floor(Math.random() * 916) + 1  ;
        this.y = -108;
        this.width = 120;
        this.height = 60;
    }
    
     public update() : void {
        this.draw();
        this.y = this.y + this.speed;   
        
        if(this.y > 1000){
            if(this.alive == true){
            this.level.div.removeChild(this.div);
            this.level.lives = this.level.lives - 1; 
            this.alive = false;
            } 
        }  
    }
  
    public dragonHit(): void{
        
        console.log("hoi");
        if(this.alive == true){
        this.level.div.removeChild(this.div);
        this.level.points ++;
        this.alive = false;
        }
    }
    
    
    
    public draw() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
        
       
    }
}