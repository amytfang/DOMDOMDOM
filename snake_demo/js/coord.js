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
