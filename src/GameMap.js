class GameMap {
  constructor(width, height, defaultTile = null) {
    this.width = width;
    this.height = height;
    this.grid = [];
    
    for (let y = 0; y < height; y++) {
      this.grid[y] = [];
      for (let x = 0; x < width; x++) {
        this.grid[y][x] = defaultTile;
      }
    }
  }

  getTile(x, y) {
    if (this.isValidPosition(x, y)) {
      return this.grid[y][x];
    }
    return undefined;
  }

  setTile(x, y, value) {
    if (this.isValidPosition(x, y)) {
      this.grid[y][x] = value;
      return true;
    }
    return false;
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  fill(value) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = value;
      }
    }
  }

  getNeighbors(x, y, includeDiagonals = false) {
    const neighbors = [];
    const directions = [
      { dx: 0, dy: -1 },  // North
      { dx: 1, dy: 0 },   // East
      { dx: 0, dy: 1 },   // South
      { dx: -1, dy: 0 }   // West
    ];

    if (includeDiagonals) {
      directions.push(
        { dx: 1, dy: -1 },  // Northeast
        { dx: 1, dy: 1 },   // Southeast
        { dx: -1, dy: 1 },  // Southwest
        { dx: -1, dy: -1 }  // Northwest
      );
    }

    for (const dir of directions) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;
      if (this.isValidPosition(newX, newY)) {
        neighbors.push({
          x: newX,
          y: newY,
          value: this.grid[newY][newX]
        });
      }
    }

    return neighbors;
  }

  toString() {
    return this.grid.map(row => 
      row.map(tile => tile === null ? '.' : tile).join(' ')
    ).join('\n');
  }

  toArray() {
    return this.grid.map(row => [...row]);
  }
}

module.exports = GameMap;
