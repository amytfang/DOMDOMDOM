const Coord = require("./coord.js");
const Board = require("./board.js");

class Snake {
  constructor(board) {
    this.direction = "N";
    this.body = [new Coord(10,10)];
    this.segments = 1;
    this.board = board;
  }

  head() {
    return this.body[0];
  }

  eatApple() {
    if (this.head().isEqual(this.board.apple)) {
      this.segments += 3;
      return true;
    } else {
      return false;
    }
  }

  move() {
    const nextMove = this.body[0].plus(this.direction);
    this.body.unshift(nextMove);

    if (this.eatApple()) {
      this.board.appleRespawn();
    }

    if (this.body.length >= this.segments) {
      this.body.pop();
    }

    if (this.endGame()) {
      this.body = [];
    }
  }

  turn(newDirection) {
    if (newDirection === "S" && this.direction !== "N") {
      this.direction = "S";
    } else if (newDirection === "E" && this.direction !== "W") {
      this.direction = "E";
    } else if (newDirection === "N" && this.direction !== "S") {
      this.direction = "N";
    } else if (newDirection === "W" && this.direction !== "E") {
      this.direction = "W";
    }
  }

  endGame() {
    const head = this.head();
    if (head.x < 0 || head.x >= this.board.length ||
      head.y < 0 || head.y >= this.board.length) {
        return true;
    } else if (head.includedIn(this.body.slice(1))){
      return true;
    } else {
      return false;
    }
  }


}

module.exports = Snake;
