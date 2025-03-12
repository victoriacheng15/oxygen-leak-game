export default class SafeClass {
    constructor(p) {
      this.p = p; // Store the p5 instance
      this.r = 75;
      this.x = p.random(50, p.windowWidth - 50); // Use p.random and p.windowWidth
      this.y = p.random(50, p.windowHeight - 350); // Use p.random and p.windowHeight
    }
  
    show() {
      this.p.fill(176, 233, 255, 80); // Use p.fill
      this.p.strokeWeight(3); // Use p.strokeWeight
      this.p.stroke(136, 255, 0); // Use p.stroke
      this.p.rect(this.x, this.y, this.r, this.r, 10, 10); // Use p.rect
    }
  }