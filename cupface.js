document.addEventListener("DOMContentLoaded", () => {
  const backgroundCanvas = document.getElementById('background');
  const backgroundContext = backgroundCanvas.getContext('2d');
  const bulletCanvas = document.getElementById('bullets');
  const bulletContext = bulletCanvas.getContext('2d');
  const canvas = document.getElementById('ship');
  const context = canvas.getContext('2d');
  const bossCanvas = document.getElementById('boss');
  const bossContext = canvas.getContext('2d');
  const chopper = new Image();
  chopper.src = "assets/cuphead_chopper.png";
  const spinChopper = new Image();
  spinChopper.src = "assets/spin_chopper.png";
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

  const game = {
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
    },
    myKing1: 12,
    myKing2: 18,
    sX: 18,
    sY: 420,
    sH: 420,
    sW: 237,
    kingPresence: true,
    KingYPosition: 0,
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
    context,
    i: 0,
    j: 0,
    king_direction: false,
    bulletContext,
    backgroundContext,
    bossContext,
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
      // game.updateKingPosition();
      game.updateShipPosition();
      if (game.state.spinning) {
        game.spin();
      } else {
        this.context.drawImage(chopper, this.startingX, this.startingY);
      }
      this.bulletContext.clearRect(0, 0, 600, 400);
      this.bullets.forEach((bullet) => {
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
    },
    collideWithKing: function() {
    },
    collideWithChopper: function() {
    },
    drawBossStandard: function() {
      this.bossContext.drawImage(
        kingDice, game.myKing1, 0, 222.4, 400, 370, 0, 111.2, 210
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
            game.KingYPosition = Math.floor(Math.random() * 250);
          }
        }
      }
      this.bossContext.drawImage(
        kingDice, game.sX, game.sY, game.sW, game.sH,
        470, game.KingYPosition, 67, 126
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
        470, game.KingYPosition, 67, 126
      );
    },
    updateShipPosition: () => {
      if (game.movement.left && game.startingX > 2) {
        game.startingX -= 5;
      }
      if (game.movement.right && game.startingX + game.shipX < 598) {
        game.startingX += 5;
      }
      if (game.movement.up && game.startingY > 2) {
        game.startingY -= 5;
      }
      if (game.movement.down && game.startingY + game.shipY < 398) {
        game.startingY += 5;
      }
    },
    updateKingPosition: () => {
      if (game.kingMovement.up) {
        let kappa;
      }
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    move: function (direction) {
      if (direction === "left") {
        game.movement.right ?
        game.movement.right = false :
        game.movement.left = true
      } else if (direction == "right") {
        game.movement.left ?
        game.movement.left = false :
        game.movement.right = true
      } else if (direction == "up") {
        game.movement.down ?
        game.movement.down = false :
        game.movement.up = true
      } else {
        game.movement.up ?
        game.movement.up = false :
        game.movement.down = true
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
      let newBullet = {
        x,
        y,
        type,
      };
      game.bullets.push(newBullet);
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
  };
  const step = () => {
    game.start();
    requestAnimationFrame(step);
  };
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 90:
        console.log("z, parry");
        game.state.spinning = true;
        break;
      case 67:
        console.log('c, bomb');
        game.shoot(game.startingX + 15, game.startingY + 10, "bomb");
        break;
      case 16:
        game.shrink();
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
