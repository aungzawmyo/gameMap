const GameMap = require('./src/GameMap');

// Create a 10x10 game map with default tile value of 0
const map = new GameMap(10, 10, 0);

console.log('Created a 10x10 game map\n');

// Set some tiles
map.setTile(0, 0, 1);  // Top-left corner
map.setTile(9, 9, 1);  // Bottom-right corner
map.setTile(5, 5, 2);  // Center

// Create a border
for (let x = 0; x < map.getWidth(); x++) {
  map.setTile(x, 0, 1);  // Top border
  map.setTile(x, map.getHeight() - 1, 1);  // Bottom border
}
for (let y = 0; y < map.getHeight(); y++) {
  map.setTile(0, y, 1);  // Left border
  map.setTile(map.getWidth() - 1, y, 1);  // Right border
}

console.log('Map with border:');
console.log(map.toString());
console.log();

// Get neighbors of center tile
const neighbors = map.getNeighbors(5, 5);
console.log('Neighbors of center tile (5, 5):');
neighbors.forEach(n => {
  console.log(`  Position (${n.x}, ${n.y}): ${n.value}`);
});
console.log();

// Get neighbors including diagonals
const allNeighbors = map.getNeighbors(5, 5, true);
console.log('All neighbors of center tile (including diagonals):');
allNeighbors.forEach(n => {
  console.log(`  Position (${n.x}, ${n.y}): ${n.value}`);
});
