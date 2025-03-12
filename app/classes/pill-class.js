export default class PillClass {
    constructor(p) {
      this.p = p;
      this.img = p.loadImage('https://cdn-icons-png.flaticon.com/512/1469/1469840.png');
      this.r = 35;
      this.x = p.random(this.r * 2, p.windowWidth - (this.r * 2));
      this.y = p.random(this.r * 2, p.windowHeight - (this.r * 2));
      this.str = 10;
  
      this.vy = 4.5;
      this.a = 220;
      this.b = 220;
  
      this.x2 = this.x;
      this.y2 = this.y;
      this.vx2 = 3;
      this.y1 = this.y;
      this.vy1 = 3;
    }
  
    show() {
      this.p.strokeWeight(2);
      this.p.stroke(255, 255, 255);
      this.p.noFill();
      this.p.ellipse(this.x, this.y, this.r);
      this.p.fill(255, this.a, this.b);
  
      if (this.a > 0 && this.b > 0) {
        this.a = this.a - 0.5;
        this.b = this.b - 0.5;
      }
  
      this.p.ellipse(this.x, this.y, this.r - 10);
      this.p.noStroke();
      this.p.fill(255, 255, 255);
  
      this.p.ellipse(this.x2 - 18, this.y2, this.r - 28);
  
      this.p.fill("black");
      this.p.textSize(25);
      this.p.text("", this.x - 8.5, this.y + 9);
      this.p.image(this.img, this.x - 15, this.y - 15, 30, 30);
      this.move();
    }
  
    move() {
      this.y1 = this.y1 + this.vy1;
  
      this.x2 = this.x2 + this.vx2;
  
      if (this.x2 + 3 > this.x + 35) {
        this.vx2 = this.vx2 - 3;
      }
      if (this.x2 - 3 < this.x) {
        this.vx2 = this.vx2 + 3;
      }
  
      if (this.y1 > this.y + 35) {
        this.vy1 = this.vy1 - 1;
      }
      if (this.y1 < this.y) {
        this.vy1 = 3;
      }
      if (this.y - 35 > this.p.windowHeight && this.y1 > this.p.windowHeight && this.y2 > this.p.windowHeight) {
        this.respawn();
      }
    }
  
    respawn() {
      this.x = 430;
      this.y = -1000;
      this.r = 35;
      this.vy = 4.5;
      this.a = 220;
      this.b = 220;
  
      this.x2 = this.x;
      this.y2 = this.y;
      this.vx2 = 3;
    }
  }