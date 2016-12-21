/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(1);

	$l(function () {
	  const rootEl = $l('.snake-game');
	  new SnakeView(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Coord = __webpack_require__(4);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	const Board = __webpack_require__(2);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Coord {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.directions = {
	      "N": [-1, 0],
	      "S": [1, 0],
	      "E": [0, 1],
	      "W": [0,-1]
	    };
	  }

	  plus(direction) {
	    const move = this.directions[direction];
	    return new Coord(this.x + move[0], this.y + move[1]);
	  }

	  isEqual(coord2) {
	    return (this.x === coord2.x && this.y === coord2.y);
	  }

	  includedIn(array) {
	    return array.some(this.isEqual.bind(this));
	  }


	}

	module.exports = Coord;


/***/ }
/******/ ]);
