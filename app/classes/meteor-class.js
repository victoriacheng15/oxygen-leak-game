export default class MeteorClass {
    constructor(p, i) {
      this.p = p;
      this.x = p.random(p.windowWidth, (5 * p.windowWidth) / 2);
      this.y = p.random(-3 * p.windowHeight, p.windowHeight / 3);
      this.r = p.random(40, 60);
      this.s = p.random(4, 7);
      this.color = p.color(p.random(120, 180), p.random(60, 40), p.random(20, 10));
      this.craters = this.generateCraters();
      this.active = true; // New property to track if the meteor is active
    }
  
    generateCraters() {
      let craters = [];
      let numCraters = this.p.floor(this.p.random(3, 6));
      for (let i = 0; i < numCraters; i++) {
        craters.push({
          x: this.p.random(-this.r / 2, this.r / 2),
          y: this.p.random(-this.r / 2, this.r / 2),
          size: this.p.random(this.r / 5, this.r / 3),
        });
      }
      return craters;
    }
  
    show() {
      this.p.push();
      this.p.translate(this.x, this.y);
  
      // Meteor body with gradient effect
      this.p.noStroke();
      for (let i = this.r; i > 0; i -= 5) {
        this.p.fill(
          this.p.lerpColor(
            this.p.color(160, 82, 45),
            this.p.color(100, 50, 20),
            i / this.r
          )
        );
        this.p.ellipse(0, 0, i);
      }
  
      // Craters
      this.p.fill(40, 20, 10);
      for (let crater of this.craters) {
        this.p.ellipse(crater.x, crater.y, crater.size);
      }
  
      this.p.pop();
    }
  
    move() {
      this.x -= this.s;
      this.y += this.s;
  
      // Mark meteor as inactive if it goes off-screen
      if (this.y > this.p.windowHeight + this.r) {
        this.active = false;
      }
    }
  }