# gameMap

A simple, flexible grid-based game map implementation in JavaScript.

## Features

- Create grid-based maps with customizable dimensions
- Get and set tile values at any position
- Fill entire map with a value
- Find neighbors of any tile (with or without diagonals)
- Export map to string or array format
- Boundary checking for all operations

## Installation

Clone this repository or copy the `src/GameMap.js` file into your project.

```bash
git clone https://github.com/aungzawmyo/gameMap.git
cd gameMap
```

## Usage

### Creating a Map

```javascript
const GameMap = require('./src/GameMap');

// Create a 10x10 map with default tile value of 0
const map = new GameMap(10, 10, 0);
```

### Setting and Getting Tiles

```javascript
// Set a tile value
map.setTile(5, 5, 'wall');

// Get a tile value
const tile = map.getTile(5, 5); // Returns 'wall'

// Check if position is valid
if (map.isValidPosition(x, y)) {
  map.setTile(x, y, value);
}
```

### Filling the Map

```javascript
// Fill entire map with a value
map.fill('grass');
```

### Finding Neighbors

```javascript
// Get orthogonal neighbors (North, South, East, West)
const neighbors = map.getNeighbors(5, 5);

// Get all neighbors including diagonals
const allNeighbors = map.getNeighbors(5, 5, true);

// Each neighbor is an object with x, y, and value
neighbors.forEach(n => {
  console.log(`Neighbor at (${n.x}, ${n.y}): ${n.value}`);
});
```

### Map Dimensions

```javascript
const width = map.getWidth();
const height = map.getHeight();
```

### Exporting Map Data

```javascript
// Convert to string representation
console.log(map.toString());

// Convert to 2D array (returns a copy)
const mapArray = map.toArray();
```

## API Reference

### Constructor

**`new GameMap(width, height, defaultTile = null)`**

Creates a new game map.

- `width` - Width of the map (number of columns)
- `height` - Height of the map (number of rows)
- `defaultTile` - Default value for all tiles (optional, defaults to null)

### Methods

**`getTile(x, y)`**

Returns the value at the specified position, or `undefined` if the position is invalid.

**`setTile(x, y, value)`**

Sets the value at the specified position. Returns `true` if successful, `false` if position is invalid.

**`isValidPosition(x, y)`**

Returns `true` if the position is within map bounds, `false` otherwise.

**`getWidth()`**

Returns the width of the map.

**`getHeight()`**

Returns the height of the map.

**`fill(value)`**

Fills the entire map with the specified value.

**`getNeighbors(x, y, includeDiagonals = false)`**

Returns an array of neighbor objects. Each object contains:
- `x` - X coordinate
- `y` - Y coordinate
- `value` - Tile value

Set `includeDiagonals` to `true` to include diagonal neighbors.

**`toString()`**

Returns a string representation of the map. Null values are displayed as `.`

**`toArray()`**

Returns a deep copy of the map as a 2D array.

## Example

```javascript
const GameMap = require('./src/GameMap');

// Create a 5x5 map
const map = new GameMap(5, 5, 0);

// Create a border
for (let x = 0; x < map.getWidth(); x++) {
  map.setTile(x, 0, 1);
  map.setTile(x, map.getHeight() - 1, 1);
}
for (let y = 0; y < map.getHeight(); y++) {
  map.setTile(0, y, 1);
  map.setTile(map.getWidth() - 1, y, 1);
}

console.log(map.toString());
```

## Running the Example

```bash
node example.js
```

## Running Tests

```bash
npm test
```

## License

MIT
