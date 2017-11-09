document.addEventListener("DOMContentLoaded", () => {
  const bulletCanvas = document.getElementById('bullets');
  const bulletContext = bulletCanvas.getContext('2d');
  const canvas = document.getElementById('ship');
  const context = canvas.getContext('2d');
  const game = {
    bullets: [],
    startingX: 200,
    startingY: 200,
    shipX: 75,
    shipY: 75,
    context,
    bulletContext,
    start: function(x, y) {
      this.context.clearRect(0, 0, 600, 400)
      this.context.fillRect(this.startingX, this.startingY, x, y)
      this.bulletContext.clearRect(0, 0, 600, 400)
      this.bullets.forEach((bullet) => {
        bullet.x += 1;
        bullet.y += 1;
        this.bulletContext.fillRect(bullet.x, bullet.y, bullet.sizeX, bullet.sizeY)
      });
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    move: async function (direction) {
      for (var i = 0; i < 24; i++) {
        await game.sleep(20);
        if (direction === "left") {
          game.startingX -= 3;
        } else if (direction == "right") {
          game.startingX += 3;
        } else if (direction == "up") {
          game.startingY -= 3;
        } else {
          game.startingY += 3;
        }
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

      case 9:
        console.log('tab, bomb');
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
      case 16:
        game.grow();
        break;
      default:
        break;
    }
  })
  step()
});
