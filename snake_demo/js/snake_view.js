const Board = require("./board.js");

class SnakeView {
  constructor(el) {
    this.el = el;
    this.board = new Board();
    this.snake = this.board.snake;
    window.addEventListener("keydown", this.handleKeyEvent.bind(this));
    this.renderBoard();
    this.interval = setInterval(this.step.bind(this), 100);
  }

  handleKeyEvent(event) {
    event.preventDefault();
    switch(event.keyCode) {
      case 37:
        this.snake.turn("W");
        break;
      case 38:
        this.snake.turn("N");
        break;
      case 39:
        this.snake.turn("E");
        break;
      case 40:
        this.snake.turn("S");
        break;
    }
  }

  renderBoard() {
    this.board.renderGrid();
    this.el.empty();
    this.board.grid.forEach((line) => {
      const $ul = $l("<ul></ul>");
      $ul.addClass("group");
      line.forEach((el) => {
        const $li = $l("<li></li>");
        if (el === "snake") $li.addClass("snake");
        if (el === "apple") $li.addClass("apple");
        $ul.append($li);
      });
      this.el.append($ul);
    });
  }

  step() {
    if (this.board.snake.body.length > 0) {
      this.renderBoard();
      this.snake.move();
    } else {
      alert("Game Over!");
      window.clearInterval(this.interval);
    }

  }
}

module.exports = SnakeView;
