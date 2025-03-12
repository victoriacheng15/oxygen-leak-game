export default class ContainerClass {
    constructor(p, x, y, strokeColor = [191, 0, 255], text = 'база') {
      this.p = p;
      this.r = 170;
      this.x = x;
      this.y = y;
      this.strokeColor = strokeColor;
      this.text = text;
    }
  
    show() {
      // Draw container with specific properties
      this.p.stroke(176, 233, 255);
      this.p.strokeWeight(2);
      this.p.fill(176, 233, 255, 80);
      this.p.textSize(30);
      this.p.text(this.text, this.x, this.y - 40);
  
      this.p.fill(176, 233, 255, 80);
      this.p.strokeWeight(5);
      this.p.stroke(this.strokeColor);
      this.p.rect(this.x, this.y, this.r, this.r - 50, 20, 20);
    }
  }