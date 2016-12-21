const Snake = require("./snake.js");
const Coord = require("./coord.js");

class Board {
  constructor(length = 30) {
    this.snake = new Snake(this);
    this.length = length;
    this.apple = new Coord(4,4);
    this.renderGrid();
    this.appleRespawn();
  }

  appleRespawn() {
    let options = [];
    for(let i = 0; i < this.length; i++) {
      for(let j = 0; j < this.length; j++) {
        if (this.grid[i][j] !== "snake") options.push([i,j]);
      }
    }
    const apple = options[Math.floor(Math.random() * options.length)];
    this.apple = new Coord(...apple);
  }

  renderGrid() {
    this.grid = [];
    for(let i = 0; i < this.length; i++) {
      this.grid.push([]);
      for(let j = 0; j < this.length; j++) {
        this.grid[i].push(null);
      }
    }

    this.snake.body.forEach((seg) => {
      this.grid[seg.x][seg.y] = "snake";
    });

    this.grid[this.apple.x][this.apple.y] = "apple";
  }

}

module.exports = Board;
