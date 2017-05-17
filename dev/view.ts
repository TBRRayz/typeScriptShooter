/**
 * View
 */
class View {
        protected game:Game;
        protected div : HTMLElement;
        protected button : HTMLElement;
        
   
        
    constructor(g:Game) {
        
        
        
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        
        this.button = document.createElement("btn");
        this.div.appendChild(this.button);
        
        
        
       
        

        

        
    }
}