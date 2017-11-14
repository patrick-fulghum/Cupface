document.addEventListener("DOMContentLoaded", () => {
  const backgroundCanvas = document.getElementById('background');
  const backgroundContext = backgroundCanvas.getContext('2d');
  const bulletCanvas = document.getElementById('bullets');
  const bulletContext = bulletCanvas.getContext('2d');
  const canvas = document.getElementById('ship');
  const context = canvas.getContext('2d');
  const bossCanvas = document.getElementById('boss');
  const bossContext = canvas.getContext('2d');
  const statsCanvas = document.getElementById('stats');
  const statsContext = statsCanvas.getContext('2d');
  const projectileCanvas = document.getElementById('projectile');
  const projectileContext = projectileCanvas.getContext('2d');
  const gameOverCanvas = document.getElementById('game-over');
  const gameOverContext = gameOverCanvas.getContext('2d');
  const explosionCanvas = document.getElementById('explosion');
  const explosionContext = explosionCanvas.getContext('2d');
  const kingDiceDeathCard = new Image();
  kingDiceDeathCard.src = "assets/death.png";
  const chopper = new Image();
  chopper.src = "assets/cuphead_chopper.png";
  const spinChopper = new Image();
  spinChopper.src = "assets/spin_chopper.png";
  const tinyChopper = new Image();
  tinyChopper.src = "assets/tiny_chopper.png";
  const missile = new Image();
  missile.src = "assets/missile.png";
  const shot = new Image();
  shot.src = "assets/peashooter.png";
  const hilde = new Image ();
  hilde.src = "assets/cuphead_boss_sprite_sheet.jpeg";
  const kingDice = new Image();
  kingDice.src = "assets/king_dice_sprite_sheet.png";
  const back1 = new Image ();
  back1.src = "assets/parallax_mountain_pack/layers/parallax-mountain-bg.png";
  const back2 = new Image ();
  back2.src = "assets/parallax_mountain_pack/layers/parallax-mountain-montain-far.png";
  const back3 = new Image ();
  back3.src = "assets/parallax_mountain_pack/layers/parallax-mountain-mountains.png";
  back3.dx = 0;
  const back4 = new Image ();
  back4.src = "assets/parallax_mountain_pack/layers/parallax-mountain-trees.png";
  back4.dx = 0;
  const back5 = new Image ();
  back5.src = "assets/parallax_mountain_pack/layers/parallax-mountain-foreground-trees.png";
  back5.dx = 0;
  const hp3 = new Image ();
  hp3.src = "assets/hp3.png";
  const hp2 = new Image();
  hp2.src = "assets/hp2.png";
  const hp1= new Image();
  hp1.src = "assets/hp1.png";
  const card1 = new Image();
  card1.src = "assets/one_card.png";
  const card2 = new Image();
  card2.src = "assets/two_cards.png";
  const card3 = new Image();
  card3.src = "assets/three_cards.png";
  const card4 = new Image();
  card4.src = "assets/four_cards.png";
  const card5 = new Image();
  card5.src = "assets/five_cards.png";
  const diceRoll = new Image();
  diceRoll.src = "assets/dice_sprite.png";
  const explosion = new Image();
  explosion.src = "assets/explosion-spritesheet.png";
  const spaceShip = new Image();
  spaceShip.src = "assets/spaceship.png";
  const greenBeam = new Image();
  greenBeam.src= "assets/green_beam.png";
  const redBeam = new Image();
  redBeam.src = "assets/red_beam.png";
  const game = {
    spaceships: [],
    moving_images: [
      back2,
      back3,
      back4,
      back5,
    ],
    movement: {
      "left": false,
      "right": false,
      "up": false,
      "down": false,
    },
    kingMovement: {
      "up": false,
      "down": true,
    },
    state: {
      spinning: false,
      invincible: true,
      tiny: false,
    },
    invincibilityIndex: 0,
    bombCount: 5,
    shipHP: 3,
    myKing1: 12,
    myKing2: 18,
    sX: 18,
    sY: 420,
    sH: 420,
    sW: 237,
    explosionFrame: 1,
    explosions: [],
    spaceShipIndex: 0,
    kingHP: 1000,
    kingPresence: true,
    kingYPosition: 0,
    kingXPosition: 470,
    king2Widths: [
      237,
      229,
      226,
      236,
      246,
      256,
      261,
      257,
      254,
      251
    ],
    king3Widths: [
      294,
      320,
      400,
      340,
      255,
      254,
      266,
      345,
      328,
      298,
      288
    ],
    king4Widths: [
      266,
      280,
      294,
      304,
      268,
      238,
      206,
      206,
      212,
      218,
      214,
      220,
      210
    ],
    projectiles: [],
    idx3: 0,
    idx4: 0,
    idx: 0,
    currentRow: 2,
    myShip: 0,
    bullets: [],
    startingX: 100,
    startingY: 100,
    shipX: 28,
    shipY: 33,
    i: 0,
    j: 0,
    k: 0,
    king_direction: false,
    context,
    bulletContext,
    backgroundContext,
    bossContext,
    statsContext,
    projectileContext,
    explosionContext,
    start: function() {
      this.context.clearRect(0, 0, 600, 400);
      this.backgroundContext.drawImage(back1, 0, 0);
      this.backgroundContext.drawImage(back2, 0, 0);
      game.moving_images.forEach((image, index) => {
        image.dx -= index * 2;
        if (image.dx < -658 && index === 3) {
          image.dx = 0;
        } else if (image.dx < -682) {
          image.dx = 0;
        }
        this.backgroundContext.drawImage(image, image.dx, 0);
      });
      if (game.kingPresence) {
        game.drawBossByeBye();
      } else {
        game.drawBossHello();
      }
      game.updateChopperPosition();
      if (game.state.spinning) {
        game.spin();
      } else if (game.state.tiny) {
        game.shrink();
      } else {
        this.context.drawImage(chopper, this.startingX, this.startingY);
      }
      game.collideWithChopper();
      this.statsContext.clearRect(0, 0, 600, 400);
      if (game.shipHP === 3) {
        this.statsContext.drawImage(hp3, 20, 20, 132, 60, 0, 370, 89, 30);
      }
      if (game.shipHP === 2) {
        this.statsContext.drawImage(hp2, 10, 6, 88.5, 39, 0, 370, 89, 30);
      }
      if (game.shipHP === 1) {
        this.statsContext.drawImage(hp1, 15, 12.5, 88.5, 38, 0, 370, 89, 30);
      }
      if (game.bombCount === 5) {
        this.statsContext.drawImage(card5, 16, 8, 170, 50, 75, 370, 68, 20);
      }
      if (game.bombCount === 4) {
        this.statsContext.drawImage(card4, 16, 8, 140, 50, 75, 370, 56, 20);
      }
      if (game.bombCount === 3) {
        this.statsContext.drawImage(card3, 16, 8, 110, 50, 75, 370, 44, 20);
      }
      if (game.bombCount === 2) {
        this.statsContext.drawImage(card2, 16, 8, 80, 50, 75, 370, 32, 20);
      }
      if (game.bombCount === 1) {
        this.statsContext.drawImage(card1, 16, 8, 50, 50, 75, 370, 20, 20);
      }
      game.invincibilityIndex++;
      if (game.invincibilityIndex > 60) {
        game.state.invincible = false;
      }
      if (game.shipHP < 1) {
        game.gameOver();
      }
      game.renderExplosions();
      this.bulletContext.clearRect(0, 0, 600, 400);
      this.bullets.forEach((bullet, index) => {
        game.collideWithKing(bullet, index);
        bullet.x += 3;
        switch (bullet.type) {
          case "bomb":
            this.bulletContext.drawImage(missile, bullet.x, bullet.y);
            break;
          case "shot":
            this.bulletContext.drawImage(shot, bullet.x, bullet.y);
            break;
        }
      });
      this.projectileContext.clearRect(0, 0, 600, 400);
      game.spaceShipIndex++;
      if (game.spaceShipIndex % 300 === 0) {
        game.spaceships.push({x: 600, y: 10,
          beamIndex: 0, attack: false, inserted: false});
      }
      game.projectiles.forEach((p) => {
        p.x -= 3;
      });
      this.spaceships.forEach((s) => {
        s.x -= 3;
        projectileContext.drawImage(spaceShip, s.x, s.y);
        if (s.x - game.startingX < 130) {
          s.attack = true;
        }
        if (s.beamIndex > 15 && s.beamIndex <= 60) {
          projectileContext.drawImage(redBeam, s.x, s.y);
        } else if (s.beamIndex > 60){
          projectileContext.drawImage(greenBeam, s.x, s.y);
          if (!s.inserted) {
            game.projectiles.push({
              x: s.x + 45,
              y: s.y,
              xW: 20,
              yL: 350,
            });
            s.inserted = true;
          }
        }
        if (s.attack) {
          s.beamIndex++;
        }
      });
    },
    collideWithKing: function(bullet, index) {
      if (bullet.x > 470 &&
        bullet.y > game.kingYPosition &&
        bullet.y < game.kingYPosition + 126) {
          let explode;
        if (bullet.type === "shot") {
          game.kingHP--;
          explode = {x: bullet.x, y: bullet.y - 20, xS: 40, yS: 40, frame: 1};
        } else {
          game.kingHP -= 3;
          explode = {x: bullet.x - 40, y: bullet.y, xS: 100, yS: 100, frame: 1};
        }
        game.explosions.push(explode);
        delete game.bullets[index];
      }
    },
    collideWithChopper: function() {
      if (!game.state.invincible) {
        game.projectiles.forEach((p) => {
          if (game.startingX + game.shipX >= p.x
            && game.startingX <= p.x + p.xW
            && (game.startingY + game.shipY >= p.y
            && game.startingY <= p.y + p.yL)) {
              game.shipHP --;
              game.state.invincible = true;
              game.invincibilityIndex = 0;
            }
        });
      }
    },
    drawBossStandard: function() {
      this.bossContext.drawImage(
        kingDice, game.myKing1, 0, 222.4, 400, 370, 0, 67, 126
      );
      game.i += 1;
      if (game.i % 5 === 0) {
        if (game.king_direction) {
          game.myKing1 -= 222.4;
        } else {
          game.myKing1 += 222.4;
        }
      }
      if (game.myKing1 > 1550) {
        game.king_direction = true;
      }
      if (game.myKing1 < 40) {
        game.king_direction = false;
      }
    },
    renderExplosions: () => {
      game.explosionContext.clearRect(0, 0, 600, 400)
      game.explosions.forEach((e) => {
        game.explosionContext.drawImage(
          explosion, e.frame * 192, 0, 192, 192, e.x, e.y, e.xS, e.yS
        );
        e.frame += 1;
      });
    },
    drawBossByeBye: function() {
      game.i += 1;
      if (game.i % 5 === 0) {
        if (game.currentRow === 2) {
          if (typeof game.king2Widths[game.idx] === 'undefined') {
            game.idx = 0;
            game.sY = 840;
            game.sH = 460;
            game.sW = game.king3Widths[game.idx];
            game.currentRow = 3;
          }
          game.sX = game.king2Widths.slice(0, game.idx)
          .reduce((s, v) => s + v, game.myKing2);
          game.sW = game.king2Widths[game.idx];
          game.idx += 1;
        } else if (game.currentRow === 3) {
          if (typeof game.king3Widths[game.idx] === "undefined") {
            game.idx = 0;
            game.sY = 1310;
            game.sH = 440;
            game.sW = game.king4Widths[game.idx];
            game.currentRow = 4;
          }
          game.sX = game.king3Widths.slice(0, game.idx)
          .reduce((s, v) => s + v, game.myKing2);
          game.sW = game.king3Widths[game.idx];
          game.idx += 1;
        } else if (game.currentRow === 4){
          game.sX = game.king4Widths.slice(0, game.idx)
          .reduce((s, v) => s + v, game.myKing2);
          game.sW = game.king4Widths[game.idx];
          game.idx += 1;
          if (typeof game.king4Widths[game.idx] === "undefined") {
            game.kingPresence = false;
            game.idx = 0;
            game.kingYPosition = Math.floor(Math.random() * 250);
          }
        }
      }
      this.bossContext.drawImage(
        kingDice, game.sX, game.sY, game.sW, game.sH,
        470, game.kingYPosition, 67, 126
      );
    },
    drawBossHello: function() {
      game.i += 1;
      if (game.i % 5 === 0) {
        if (game.currentRow === 4) {
          if (typeof game.king4Widths[game.idx] === "undefined") {
            game.idx = 0;
            game.sY = 840;
            game.sH = 460;
            game.sW = game.king3Widths[game.king3Widths.length - game.idx];
            game.currentRow = 3;
          }
          game.sX = game.king4Widths.slice(0, (game.king4Widths.length - game.idx))
          .reduce((s, v) => s + v, game.myKing2);
          game.sW = game.king4Widths[(game.king4Widths.length - game.idx)];
          game.idx += 1;
        } else if (game.currentRow === 3) {
          if (typeof game.king3Widths[game.idx] === "undefined") {
            game.idx = 0;
            game.sY = 420;
            game.sH = 420;
            game.sW = game.king2Widths[(game.king2Widths.length - game.idx)];
            game.currentRow = 2;
          }
          game.sX = game.king3Widths.slice(0, (game.king3Widths.length - game.idx))
          .reduce((s, v) => s + v, game.myKing2);
          game.sW = game.king3Widths[(game.king3Widths.length - game.idx)];
          game.idx += 1;
        } else if (game.currentRow === 2){
          game.sX = game.king2Widths.slice(0, (game.king2Widths.length - game.idx))
          .reduce((s, v) => s + v, game.myKing2);
          game.sW = game.king2Widths[(game.king2Widths.length - game.idx)];
          game.idx += 1;
          if (typeof game.king2Widths[game.idx] === 'undefined') {
            game.kingPresence = true;
            game.idx = 0;
          }
        }
      }
      this.bossContext.drawImage(
        kingDice, game.sX, game.sY, game.sW, game.sH,
        470, game.kingYPosition, 67, 126
      );
    },
    updateChopperPosition: () => {
      if (game.movement.left && game.startingX > 2) {
        game.state.tiny ?
        game.startingX -= 5 :
        game.startingX -= 3;
      }
      if (game.movement.right && game.startingX + game.shipX < 598) {
        game.state.tiny ?
        game.startingX += 5 :
        game.startingX += 3;
      }
      if (game.movement.up && game.startingY > 2) {
        game.state.tiny ?
        game.startingY -= 5 :
        game.startingY -= 3;
      }
      if (game.movement.down && game.startingY + game.shipY < 398) {
        game.state.tiny ?
        game.startingY += 5 :
        game.startingY += 3;
      }
    },
    move: function (direction) {
      if (direction === "left") {
        game.movement.right ?
        game.movement.right = false :
        game.movement.left = true;
      } else if (direction === "right") {
        game.movement.left ?
        game.movement.left = false :
        game.movement.right = true;
      } else if (direction === "up") {
        game.movement.down ?
        game.movement.down = false :
        game.movement.up = true;
      } else {
        game.movement.up ?
        game.movement.up = false :
        game.movement.down = true;
      }
    },
    cease: function(direction) {
      if (direction === "left") {
        game.movement.left = false;
      }
      if (direction === "right") {
        game.movement.right = false;
      }
      if (direction === "up") {
        game.movement.up = false;
      }
      if (direction === "down") {
        game.movement.down = false;
      }
    },
    shoot: function(x, y, type) {
      if (!game.state.spinning && !game.state.tiny) {
        let newBullet = {
          x,
          y,
          type,
        };
        if (newBullet.type === "shot" ||
        (newBullet.type === "bomb" && game.bombCount > 0)) {
          game.bullets.push(newBullet);
        }
        if (newBullet.type === "bomb") {
          game.bombCount --;
        }
      }
    },
    spin: function() {
      game.context.drawImage(
        spinChopper, game.myShip, 0, 40, 40,
        game.startingX, game.startingY, 40, 40
      );
      game.j += 1;
      if (game.j % 5 === 0) {
        game.myShip += 40;
      }
      if (game.myShip > 280) {
        game.myShip = 0;
      }
    },
    shrink: function() {
      game.context.drawImage(
        tinyChopper, game.startingX, game.startingY
      );
    },
    gameOver: function() {
      gameOverContext.drawImage(kingDiceDeathCard, 0, 0);
    }
  };
  const step = () => {
    game.start();
    requestAnimationFrame(step);
  };
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 90:
        console.log("z, parry");
        if (!game.state.tiny) {
          game.state.spinning = true;
        }
        break;
      case 67:
        console.log('c, bomb');
        game.shoot(game.startingX + 15, game.startingY + 10, "bomb");
        break;
      case 16:
        if (!game.state.spinning) {
          game.state.tiny = true;
        }
        console.log('shift, shrink');
        break;
      case 87 || 38:
        game.move("up");
        break;
      case 65 || 37:
        game.move('left');
        break;
      case 83 || 40:
        game.move("down");
        break;
      case 68 || 39:
        game.move("right");
        break;
      case 88:
        console.log('x, shoot');
        game.shoot(game.startingX + 26, game.startingY + 17, "shot");
        break;
      default:
        console.log("GGXD");
        break;
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 87 || 38:
        game.cease("up");
        break;
      case 65 || 37:
        game.cease('left');
        break;
      case 83 || 40:
        game.cease("down");
        break;
      case 68 || 39:
        game.cease("right");
        break;
      case 16:
        game.state.tiny = false;
        break;
      case 90:
        game.state.spinning = false;
        break;
      default:
        break;
    }
  });
  step();
});
