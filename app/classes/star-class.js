export default class StarClass {
    constructor(p) {
      this.p = p; // Store the p5 instance
      this.x = p.random(p.windowWidth); // Use p.random and p.windowWidth
      this.y = p.random(p.windowHeight); // Use p.random and p.windowHeight
      this.r = p.random(3, 6); // Use p.random
      this.t = p.random(1, 6); // Use p.random
      this.time = 15;
  
      this.al = 0;
      this.br = 0;
    }
  
    show() {
      this.p.fill(117, 117, 117, this.br); // Use p.fill
  
      if (this.br < 5) {
        this.al = this.t;
      }
  
      if (this.br > 250) {
        this.al = -this.t;
      }
  
      this.br = this.br + this.al;
  
      this.p.noStroke(); // Use p.noStroke
      this.p.ellipse(this.x, this.y, this.r); // Use p.ellipse
    }
  }