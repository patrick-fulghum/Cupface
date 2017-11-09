document.addEventListener("DOMContentLoaded", () => {
  const bulletCanvas = document.getElementById('bullets');
  const bulletContext = bulletCanvas.getContext('2d');
  const canvas = document.getElementById('ship');
  const context = canvas.getContext('2d');
  const game = {
    movement: {
      "left": false,
      "right": false,
      "up": false,
      "down": false,
    },
    bullets: [],
    startingX: 200,
    startingY: 200,
    shipX: 75,
    shipY: 75,
    context,
    bulletContext,
    start: function(x, y) {
      this.context.clearRect(0, 0, 600, 400)
      game.updateShipPosition();
      this.context.fillRect(this.startingX, this.startingY, x, y)
      this.bulletContext.clearRect(0, 0, 600, 400)
      this.bullets.forEach((bullet) => {
        bullet.x += 3;
        // bullet.y += 1;
        this.bulletContext.fillRect(bullet.x, bullet.y, bullet.sizeX, bullet.sizeY)
      });
    },
    updateShipPosition: () => {
      if (game.movement.left && game.startingX > 2) {
        game.startingX -= 3;
      }
      if (game.movement.right && game.startingX + game.shipX < 598) {
        game.startingX += 3;
      }
      if (game.movement.up && game.startingY > 2) {
        game.startingY -= 3;
      }
      if (game.movement.down && game.startingY + game.shipY < 398) {
        game.startingY += 3;
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
    shoot: function(x, y, sizeX, sizeY) {
      let newBullet = {
        x,
        y,
        sizeX,
        sizeY,
      }
      game.bullets.push(newBullet);
    },
    shrink: async function() {
      for (var i = 0; i < 8; i++) {
        await game.sleep(40);
        this.shipX -= 3;
        this.shipY -= 3;
      }
    },
    grow: async function() {
      for (var i = 0; i < 8; i++) {
        await game.sleep(40);
        this.shipX += 3;
        this.shipY += 3;
      }
    }
  }
  const step = () => {
    game.start(game.shipX, game.shipY)
    requestAnimationFrame(step)
  }
  document.addEventListener("keydown", async (e) => {
    switch (e.keyCode) {
      case 90:
        console.log("z, parry");
        break
      case 67:
        console.log('c, bomb');
        game.shoot(game.startingX + 10 + game.shipX, game.startingY + game.shipY / 3.14159, 25, 25)
        break
      case 16:
        game.shrink()
        console.log('shift, shrink');
        break
      case 87 || 38:
        game.move("up");
        break
      case 65 || 37:
        game.move('left')
        break
      case 83 || 40:
        game.move("down")
        break
      case 68 || 39:
        game.move("right")
        break
      case 88:
        console.log('x, shoot');
        game.shoot(game.startingX + 10 + game.shipX, game.startingY + game.shipY / 2, 5, 5)
        break
      default:
        console.log("GGXD");
        break
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 87 || 38:
        game.cease("up");
        break
      case 65 || 37:
        game.cease('left')
        break
      case 83 || 40:
        game.cease("down")
        break
      case 68 || 39:
        game.cease("right")
        break
      case 16:
        game.grow();
        break;
      default:
        break;
    }
  })
  step()
});
