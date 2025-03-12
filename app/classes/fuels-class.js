export default class FuelsClass {
    constructor(p, player) {
      this.p = p;
      this.player = player;
      this.x = player.x + player.r;
      this.y = player.y - player.r;
  
      this.vx = p.random(player.vx);
      this.vy = p.random(player.vy);
      this.k = 2;
      this.b = 255;
      this.kb = p.random(20, 25);
    }
  
    show() {
      this.p.fill(255, 246, 227, this.b);
      this.p.strokeWeight(1);
      this.p.stroke(222, 255, 254, this.b - 100);
      this.p.ellipse(this.x, this.y, 10);
      this.move();
    }
  
    move() {
      this.b -= this.kb;
      this.y = this.y - this.vy;
  
      if (this.b < 0) {
        this.x = this.player.x + this.player.r / 2;
        this.y = this.player.y + this.player.r;
        this.b = 255;
      }
    }
  }