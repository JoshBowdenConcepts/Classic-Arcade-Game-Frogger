// Enemies our player must avoid
var Enemy = function(lng, lat) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = lng;
    this.y = lat;
    this.speed = 100;
    this.width = 70;
    this.height = 60;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 500) {
        this.x = -60;
        this.speed = 100 + Math.floor(Math.random() * 200);
    };

    // Learned basic ideas of 2D Collision Detection from: http://blog.sklambert.com/html5-canvas-game-2d-collision-detection#d-collision-detection
  
    if  (
            player.x < this.x + this.width &&
            player.x + this.width > this.x &&
            player.y < this.y + this.height &&
            this.height + player.y > this.y
        ) {
        player.x = 100;
        player.y = 400;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(lng, lat) {
    this.sprite = 'images/char-boy.png';
    this.x = lng;
    this.y = lat;
    this.speed = 40;
  }
  update() {
    // Update occurs in the handleInput function
  }
  reset() {
    // Reset the player to the beginning of the board.
    this.x = 100;
    this.y = 400;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        // Set the left bound to 0
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }
    if (keyPress == 'up') {
        if (this.y > -40) {
            this.y -= this.speed
        }
        // This is the winning condition. We want to increase the score and reset the player to the bottom of the screen.
        if (this.y === -40) {
            console.log('Player made it to the river');
            this.reset();
        }
    }
    if (keyPress == 'right') {
        // Set the right bound to 400
        if (this.x < 400) {
            this.x += this.speed;
        }
    }
    if (keyPress == 'down') {
        if (this.y < 400) {
            this.y += this.speed;
            console.log(this.y);
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(100, 400);
let allEnemies = [
    new Enemy(-60, 60),
    new Enemy(-60, 140),
    new Enemy(-60, 220)
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
