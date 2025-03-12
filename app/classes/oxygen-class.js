export default class OxygenClass {
    constructor(p) {
      this.p = p;
      this.r = Math.trunc(p.random(15, 70));
      this.x = p.random(this.r, p.windowWidth - this.r);
      this.y = p.random(this.r, p.windowHeight - this.r);
      this.inCont = 0;
      this.vx = p.random(-1.5, 1.5);
      this.vy = p.random(-1.5, 1.5);
    }
  
    show() {
      // Draw the larger ellipse
      this.p.fill(222, 255, 254, 100);
      this.p.strokeWeight(3);
      this.p.stroke('white');
      this.p.ellipse(this.x, this.y, this.r); // Double the radius for width and height
  
      // Draw smaller ellipses inside the larger ellipse based on `r`
      this.p.strokeWeight(0);
      this.p.fill('white');
      for (let i = 0; i < this.r / 4; i++) {
        let angle = this.p.random(this.p.TWO_PI); // Random angle
        let distFromCenter = this.p.random(0, this.r / 2); // Random distance from center
        let smallX = this.x + distFromCenter * this.p.cos(angle);
        let smallY = this.y + distFromCenter * this.p.sin(angle);
        let smallR = this.p.random(3, 8); // Size of smaller ellipses
  
        this.p.ellipse(smallX, smallY, smallR);
      }
  
      // Display the radius value on top
      this.p.textSize(18);
      this.p.fill('white');
      this.p.text(this.r, this.x - 10, this.y - 8);
  
      // Move the oxygen object
      this.move();
    }
  
    move() {
      this.x += this.vx;
      this.y += this.vy;
  
      // Bounce off the walls
      if (this.x + this.r > this.p.windowWidth || this.x - this.r < 0) {
        this.vx = -this.vx;
      }
  
      if (this.y + this.r > this.p.windowHeight || this.y - this.r < 0) {
        this.vy = -this.vy;
      }
    }
  }