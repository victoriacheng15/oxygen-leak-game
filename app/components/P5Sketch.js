'use client'
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import SafeClass from '../classes/safe-class';
import PlayerClass from '../classes/player-class';
import PillClass from '../classes/pill-class';
import ContainerClass from '../classes/container-class';
import MeteorClass from '../classes/meteor-class';
import OxygenClass from '../classes/oxygen-class';
import HeartClass from '../classes/heart-class';
import FuelsClass from '../classes/fuels-class';
import StarClass from '../classes/star-class';

const P5Sketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let stars = [];
      let j = 200;
      let spd = 4;
      let elliCount = 15;
      let elli = [];
      let elliInCont1 = [];
      let elliInCont2 = [];
      let healthPurplePlayer = [];
      let heartC = 3;
      let heartDone = 0;
      let healthBluePlayer = [];
      let heartC2 = 3;
      let heartDone2 = 0;
      let time = 1501;
      let t = 0;
      let tBack = 50;
      let timeMin = 1;
      let fuel = [];
      let fuel2 = [];
      let pillTime = 800;
      let pillMin = 1;
      let meteors = [];
      let meteorCount = 100;
      let start = 0;
      let repeat = 0;
      let meteorShowerActive = false;

      let pic;
      let safe;
      let firstPlayer;
      let secondPlayer;
      let pill;
      let containerPurplePlayer;
      let containerBluePlayer;

      p.preload = () => {
        pic = p.loadImage('https://cdn-icons-png.flaticon.com/512/1469/1469840.png');
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        safe = new SafeClass(p);
        firstPlayer = new PlayerClass(p, 0, [191, 0, 255]);
        secondPlayer = new PlayerClass(p, 40, [0, 155, 255]);
        pill = new PillClass(p);

        containerPurplePlayer = new ContainerClass(p, 50, p.windowHeight - 150, [191, 0, 255], 'Oxygen place for Purple');
        containerBluePlayer = new ContainerClass(p, p.windowWidth - 300, p.windowHeight - 150, [0, 115, 255], 'Oxygen place for Blue');

        for (let i = 0; i < meteorCount; i++) {
          meteors.push(new MeteorClass(p, i));
        }

        initializeObjects(firstPlayer, secondPlayer);
      };

      const initializeObjects = (firstPlayer, secondPlayer) => {
        for (let i = 0; i < elliCount; i++) {
          elli[i] = new OxygenClass(p);
        }
        for (let i = 0; i < meteorCount; i++) {
          meteors[i] = new MeteorClass(p);
        }
        for (let i = 0; i < heartC; i++) {
          healthPurplePlayer[i] = new HeartClass(p, i, "purple");
        }
        for (let i = 0; i < heartC2; i++) {
          healthBluePlayer[i] = new HeartClass(p, i, "blue");
        }
        for (let i = 0; i < 15; i++) {
          fuel[i] = new FuelsClass(p, firstPlayer);
          fuel2[i] = new FuelsClass(p, secondPlayer);
        }
        for (let u = 0; u < j; u++) {
          stars[u] = new StarClass(p);
        }
      };

      p.draw = () => {
        p.background(0, 2, 10);
        for (let u = 0; u < j; u++) {
          stars[u].show();
        }

        if (start == 0) {
          displayStartScreen();
        } else {
          handleGameLogic();
        }
      };

      const displayStartScreen = () => {
        let startTextPostion = p.windowWidth / 4;
        p.textSize(40);
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('There was an oxygen leak!', p.windowWidth / 2, p.windowHeight / 2 - 180);
        p.text("Collect it so you don't die!!!", p.windowWidth / 2, p.windowHeight / 2 - 130);

        p.textSize(24);
        p.text('Click your mouse to start', p.windowWidth / 2, p.windowHeight / 2 - 80);

        p.textSize(26);
        p.fill(255);
        p.textAlign(p.LEFT, p.TOP);
        p.text('Rules:', startTextPostion, p.windowHeight / 2 - 20);

        p.textSize(20);
        p.text('• Astronauts have power', startTextPostion, p.windowHeight / 2 + 20);
        p.text('• They can collect oxygen spheres of the corresponding weight and less per base', startTextPostion, p.windowHeight / 2 + 50);
        p.text('• The winner is the one who collects more oxygen to their base.', startTextPostion, p.windowHeight / 2 + 80);
        p.text('• To become stronger, collect spheres and power tablets', startTextPostion, p.windowHeight / 2 + 110);

        p.textSize(24);
        p.fill(191, 0, 255);
        p.text('Purple Player Controls:', startTextPostion, p.windowHeight / 2 + 140);
        p.textSize(20);
        p.text('• WASD - move', startTextPostion, p.windowHeight / 2 + 170);
        p.text('• Hold Space - collect', startTextPostion, p.windowHeight / 2 + 200);

        p.textSize(24);
        p.fill(0, 115, 255);
        p.text('Blue Player Controls:', startTextPostion * 2, p.windowHeight / 2 + 140);
        p.textSize(20);
        p.text('• PL;\', - move', startTextPostion * 2, p.windowHeight / 2 + 170);
        p.text('• Hold Right Enter - collect', startTextPostion * 2, p.windowHeight / 2 + 200);

        p.fill(255);
      };

      const handleGameLogic = () => {
        if (repeat == 2) {
          resetGame();
        }

        for (let u = 0; u < j; u++) {
          stars[u].show();
        }

        pillTime -= pillMin;
        if (pillTime < 0) {
          pill.show();
        }

        for (let i = 0; i < elliCount; i++) {
          elli[i].show();
        }

        if (healthPurplePlayer && healthPurplePlayer.length > 0) {
          for (let i = 0; i < heartC; i++) {
            if (healthPurplePlayer[i]) {
              healthPurplePlayer[i].show();
            }
          }
        }

        if (healthBluePlayer && healthBluePlayer.length > 0) {
          for (let i = 0; i < heartC2; i++) {
            if (healthBluePlayer[i]) {
              healthBluePlayer[i].show();
            }
          }
        }

        for (let i = 0; i < 15; i++) {
          fuel[i].show();
        }

        for (let i = 0; i < 15; i++) {
          fuel2[i].show();
        }

        firstPlayer.show();
        secondPlayer.show();

        containerPurplePlayer.show();
        containerBluePlayer.show();

        safe.show();

        handlePillCollision();
        handleElliCollision();
        handleSafeZone();
        handlePlayerMovement();
        handleMeteorShower();
        displayGameStats();

        if (elliInCont1.length + elliInCont2.length == elliCount) {
          endGame();
        }

        if (healthPurplePlayer.length === 0 || healthBluePlayer === 0) {
          endGame();
        }
      };

      const resetGame = () => {
        for (let i = 0; i < elliCount; i++) {
          elli[i].r = Math.trunc(p.random(16, 70));
          elli[i].x = p.random(elli[i].r, p.windowWidth - (elli[i].r));
          elli[i].y = p.random(elli[i].r, p.windowHeight - (elli[i].r));
          elli[i].inCont = 0;
          elli[i].vx = p.random(-1.5, 1.5);
          elli[i].vy = p.random(-1.5, 1.5);
          elli[i].show();
        }
        initializeObjects(firstPlayer, secondPlayer);

        elliInCont1 = [];
        elliInCont2 = [];

        timeMin = 1;
        pillMin = 1;
        time = 1501;
        t = 0;
        pillTime = 800;

        meteors = [];
        meteorCount = 200;
        for (let i = 0; i < meteorCount; i++) {
          meteors[i] = new MeteorClass(p);
          meteors[i].x = p.random(p.windowWidth, 5 * p.windowWidth / 2);
          meteors[i].y = p.random(-3 * p.windowHeight, p.windowHeight / 3);
          meteors[i].r = 55;
          meteors[i].s = p.random(15, 20);
        }

        repeat = 0;
      };

      const handlePillCollision = () => {
        if (pill.r + firstPlayer.r - (pill.r / 1.5) >= calculateDistance(pill.x, pill.y, firstPlayer.x, firstPlayer.y)) {
          pillTime = 1000;
          pill.x = p.random(pill.r * 2, p.windowWidth - (pill.r * 2));
          pill.y = p.random(pill.r * 2, p.windowHeight - (pill.r * 2));
          pill.x2 = pill.x;
          pill.y2 = pill.y;
          firstPlayer.str += 10;
        }

        if (pill.r + secondPlayer.r - (pill.r / 1.5) >= calculateDistance(pill.x, pill.y, secondPlayer.x, secondPlayer.y)) {
          pillTime = 1000;
          pill.x = p.random(pill.r * 2, p.windowWidth - (pill.r * 2));
          pill.y = p.random(pill.r * 2, p.windowHeight - (pill.r * 2));
          pill.x2 = pill.x;
          pill.y2 = pill.y;
          secondPlayer.str += 10;
        }
      };

      const handleElliCollision = () => {
        for (let i = 0; i < elliCount; i++) {
          if (elli[i].r + firstPlayer.r - (elli[i].r / 1.5) >= calculateDistance(elli[i].x, elli[i].y, firstPlayer.x, firstPlayer.y)) {
            if (firstPlayer.str >= elli[i].r && p.keyIsDown(32)) {
              if (elli[i].y > containerPurplePlayer.y && elli[i].y + elli[i].r < containerPurplePlayer.y + containerPurplePlayer.r - 50 && elli[i].x > containerPurplePlayer.x && elli[i].x < containerPurplePlayer.x + containerPurplePlayer.r && elli[i].inCont != 1) {
                elliInCont1.push(elli[i]);
                elli[i].inCont = 1;
                firstPlayer.str += 5;
                elli[i].vx = 0;
                elli[i].vy = 0;
              }
              elli[i].x = firstPlayer.x;
              elli[i].y = firstPlayer.y;
            } else {
              elli[i].x = elli[i].x;
              elli[i].y = elli[i].y;
            }
          }

          if (elli[i].r + secondPlayer.r - (elli[i].r / 1.5) >= calculateDistance(elli[i].x, elli[i].y, secondPlayer.x, secondPlayer.y)) {
            if (secondPlayer.str >= elli[i].r && p.keyIsDown(13)) {
              if (elli[i].y > containerBluePlayer.y && elli[i].y + elli[i].r < containerBluePlayer.y + containerBluePlayer.r - 50 && elli[i].x > containerBluePlayer.x && elli[i].x < containerBluePlayer.x + containerBluePlayer.r && elli[i].inCont != 1) {
                elliInCont2.push(elli[i]);
                elli[i].inCont = 1;
                secondPlayer.str += 5;
                elli[i].vx = 0;
                elli[i].vy = 0;
              }
              elli[i].x = secondPlayer.x;
              elli[i].y = secondPlayer.y;
            } else {
              elli[i].x = elli[i].x;
              elli[i].y = elli[i].y;
            }
          }
        }
      };

      const handleSafeZone = () => {
        if (firstPlayer.y > safe.y && firstPlayer.y + firstPlayer.r < safe.y + safe.r && firstPlayer.x > safe.x && firstPlayer.x < safe.x + safe.r) {
          firstPlayer.inSafe = 1;
        } else {
          firstPlayer.inSafe = 0;
        }

        if (secondPlayer.y > safe.y && secondPlayer.y + firstPlayer.r < safe.y + safe.r && secondPlayer.x > safe.x && secondPlayer.x < safe.x + safe.r) {
          secondPlayer.inSafe = 1;
        } else {
          secondPlayer.inSafe = 0;
        }
      };

      const handlePlayerMovement = () => {
        if (p.keyIsDown(65)) {
          if (healthPurplePlayer.length != 0) {
            firstPlayer.vx = -4;
            firstPlayer.x += firstPlayer.vx;
            for (let i = 0; i < 15; i++) {
              fuel[i].x += fuel[i].vx;
            }
          }
        }
        if (p.keyIsDown(83)) {
          if (healthPurplePlayer.length != 0) {
            firstPlayer.vy = 4;
            firstPlayer.y += firstPlayer.vy;
            for (let i = 0; i < 15; i++) {
              fuel[i].k = p.random(-1, 1) * fuel[i].k;
              fuel[i].y -= fuel[i].vy;
              fuel[i].x += fuel[i].vx + fuel[i].k;
            }
          }
        }
        if (p.keyIsDown(68)) {
          if (healthPurplePlayer.length != 0) {
            firstPlayer.vx = 4;
            firstPlayer.x += firstPlayer.vx;
            for (let i = 0; i < 15; i++) {
              fuel[i].x -= fuel[i].vx;
            }
          }
        }
        if (p.keyIsDown(87)) {
          if (healthPurplePlayer.length != 0) {
            firstPlayer.vy = -4;
            firstPlayer.y += firstPlayer.vy;
            for (let i = 0; i < 15; i++) {
              fuel[i].k = p.random(-1, 1) * fuel[i].k;
              fuel[i].y += fuel[i].vy;
              fuel[i].x += fuel[i].vx - fuel[i].x / 700 - fuel[i].k;
            }
          }
        }

        if (p.keyIsDown(76)) {
          if (healthBluePlayer.length != 0) {
            secondPlayer.vx = -4;
            secondPlayer.x += secondPlayer.vx;
            for (let i = 0; i < 15; i++) {
              fuel2[i].x += fuel2[i].vx;
            }
          }
        }
        if (p.keyIsDown(186)) {
          if (healthBluePlayer.length != 0) {
            secondPlayer.vy = 4;
            secondPlayer.y += secondPlayer.vy;
            for (let i = 0; i < 15; i++) {
              fuel2[i].k = p.random(-1, 1) * fuel2[i].k;
              fuel2[i].y -= 3 * fuel2[i].vy;
              fuel2[i].x += fuel2[i].vx + fuel2[i].k;
            }
          }
        }

        if (p.keyIsDown(222)) {
          if (healthBluePlayer.length != 0) {
            secondPlayer.x += spd;
          }
        }
        if (p.keyIsDown(80)) {
          if (healthBluePlayer.length != 0) {
            secondPlayer.vy = -4;
            secondPlayer.y += secondPlayer.vy;
            for (let i = 0; i < 15; i++) {
              fuel2[i].k = p.random(-1, 1) * fuel2[i].k;
              fuel2[i].y += 3 * fuel2[i].vy;
              fuel2[i].x += fuel2[i].vx - fuel2[i].x / 600 - fuel2[i].k;
            }
          }
        }
      };

      const handleMeteorShower = () => {
        time -= timeMin;

        if (time <= 200 && time > 0) {
          p.textSize(35);
          p.fill(255, 0, 0);
          p.strokeWeight(1);
          p.stroke(255);
          p.text('The meteor shower is coming soon!', p.windowWidth / 2 - 300, p.windowHeight / 2);
          p.text('Find a green shelter!!!', p.windowWidth / 2 - 200, p.windowHeight / 2 + 50);
        }

        if (time <= 0 && !meteorShowerActive) {
          meteorShowerActive = true;
          heartDone = 0;
          heartDone2 = 0;

          for (let i = 0; i < meteors.length; i++) {
            meteors[i].x = p.random(p.windowWidth, 5 * p.windowWidth / 2);
            meteors[i].y = p.random(-3 * p.windowHeight, p.windowHeight / 3);
            meteors[i].s = p.random(15, 20);
            meteors[i].active = true;
          }
        }

        if (meteorShowerActive) {
          let allMeteorsDropped = true;

          for (let i = 0; i < meteors.length; i++) {
            if (meteors[i].active) {
              meteors[i].move();
              meteors[i].show();

              if (meteors[i].y < p.windowHeight + meteors[i].r) {
                allMeteorsDropped = false;
              } else {
                meteors[i].active = false;
              }
            }
          }

          if (allMeteorsDropped) {
            meteorShowerActive = false;
            time = 1501;
            safe.x = p.random(50, p.windowWidth - 50);
            safe.y = p.random(50, p.windowHeight - 350);
          }
        }

        if (time < -150 && tBack > 0) {
          if (firstPlayer.inSafe == 0 && heartDone != 1) {
            heartDone = 1;
            healthPurplePlayer.pop();
          }
          if (secondPlayer.inSafe == 0 && heartDone2 != 1) {
            heartDone2 = 1;
            healthBluePlayer.pop();
          }
        }
      };

      const displayGameStats = () => {
        p.fill('white');
        p.stroke(0);
        p.textSize(40);
        if (time >= 0) {
          p.text(time / 100, p.windowWidth / 2 - 50, 110);
        } else {
          p.text('0', p.windowWidth / 2 - 50, 110);
        }

        p.text(elliInCont1.length, p.windowWidth / 2 - 50, 60);
        p.text(':', p.windowWidth / 2, 60);
        p.text(elliInCont2.length, p.windowWidth / 2 + 30, 60);
        p.textSize(25);
        p.text('Health', 50, 100);
        p.text('Purple player', 50, 125);
        p.text('Health', p.windowWidth - 125, 100);
        p.text('Blue player', p.windowWidth - 125, 125);
      };

      const endGame = () => {
        p.textSize(40);
        p.fill('yellow');
        if (elliInCont1.length > elliInCont2.length) {
          p.textAlign(p.CENTER, p.CENTER);
          p.text('Purple player won!', p.windowWidth / 2, p.windowHeight / 2 - 50);
        }
        if (elliInCont1.length < elliInCont2.length) {
          p.textAlign(p.CENTER, p.CENTER);
          p.text('Blue player won!', p.windowWidth / 2, p.windowHeight / 2 - 50);
        }
        if (healthPurplePlayer.length == 0 && healthBluePlayer.length == 0) {
          p.textAlign(p.CENTER, p.CENTER);
          p.text('End of the Game', p.windowWidth / 2, p.windowHeight / 2 - 50);
          repeat = 1;
        }
        p.textAlign(p.CENTER, p.CENTER);
        p.text('Click mouse to start the game again', p.windowWidth / 2, p.windowHeight / 2);
        repeat = 1;
      };

      p.mouseClicked = () => {
        if (start == 0) {
          start = 1;
        }
        if (start == 1 && repeat == 1) {
          repeat = 2;
        }
      };

      const calculateDistance = (x1, y1, x2, y2) => {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);
    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Sketch;