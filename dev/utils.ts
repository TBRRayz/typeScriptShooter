/**
 * Utils
 */
class Utils {
    constructor() {
        
    }
    
        //check of een ball en dragon elkaar overlappen.
     hasOverlap(c1:Ball, c2:Dragons): boolean {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    }
}