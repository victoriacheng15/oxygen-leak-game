export default class HeartClass {
    constructor(p, i, type) {
      this.p = p;
      this.r = 20; // Radius
      this.y = 20; // Y position
  
      // Set position and color based on type
      if (type === "purple") {
        this.x = 50 + i * 25; // Purple hearts' X position
        this.color = this.p.color(191, 0, 255); // Purple color
      } else if (type === "blue") {
        this.x = this.p.windowWidth - 130 + i * 25; // Blue hearts' X position
        this.color = this.p.color(0, 155, 255); // Blue color
      }
    }
  
    show() {
      this.p.fill(this.color); // Use the color set in the constructor
      this.p.noStroke();
      this.p.rect(this.x, this.y, this.r, this.r + 20, 5); // Draw the heart
    }
  }