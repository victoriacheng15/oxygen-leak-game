export default class PlayerClass {
    constructor(p, position = 0, color = [191, 0, 255]) {
      this.p = p; // Store the p5 instance
      this.r = 30;
      this.x = p.windowWidth / 2 - 60 + position; // Use p.windowWidth
      this.y = p.windowHeight / 2; // Use p.windowHeight
      this.vx = 4;
      this.vy = 4;
      this.str = 40;
      this.inSafe = 0;
      this.color = color;
      this.state = "normal";
    }
  
    show() {
      this.p.strokeWeight(2); // Use p.strokeWeight
      this.p.stroke("white"); // Use p.stroke
  
      if (this.state === "gameOver") {
        this.p.fill(168, 61, 49); // Use p.fill
      } else {
        this.p.fill(this.color); // Use p.fill
      }
  
      this.p.rect(this.x, this.y + 26, this.r - 20, 10, 2); // Use p.rect
      this.p.rect(this.x + 20, this.y + 26, this.r - 20, 10, 2); // Use p.rect
      this.p.rect(this.x, this.y, this.r, this.r, 5); // Use p.rect
  
      this.p.fill(185, 221, 237); // Use p.fill
      this.p.ellipse(this.x + 14.8, this.y + 12, 20, 15); // Use p.ellipse
  
      this.p.fill("white"); // Use p.fill
      this.p.strokeWeight(0); // Use p.strokeWeight
      this.p.textSize(18); // Use p.textSize
      this.p.text(this.str, this.x + 5, this.y - 16); // Use p.text
    }
  
    setState(state) {
      this.state = state;
    }
  
    move() {
      // Add movement logic here if needed
    }
  }