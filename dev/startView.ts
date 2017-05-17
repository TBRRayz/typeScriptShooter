/// <reference path="view.ts" />


/**
 * startView extends View
 */
class StartView extends View {
    
    protected button : HTMLElement;
    
    constructor(g:Game) {
        super(g);
        
        this.game = g;
        
        
        this.button.innerHTML = "START DE GAME!";
        this.button.addEventListener("click", this.onClick.bind(this));
        
        
        
    }
        private onClick():void {
        this.removeView();
            
        this.game.showLevelView();
        
        
    }

    private removeView():void {
        // door de container weg te halen, verdwijnt ook alles dat daarin zat (de tekst en de knop)
        this.div.remove();
    }
    
}