const GameMap = require('../src/GameMap');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function testConstructor() {
  console.log('Testing constructor...');
  const map = new GameMap(5, 5, 0);
  assert(map.getWidth() === 5, 'Width should be 5');
  assert(map.getHeight() === 5, 'Height should be 5');
  assert(map.getTile(0, 0) === 0, 'Default tile should be 0');
  assert(map.getTile(4, 4) === 0, 'All tiles should be initialized');
  console.log('✓ Constructor test passed');
}

function testGetSetTile() {
  console.log('Testing getTile and setTile...');
  const map = new GameMap(3, 3);
  
  map.setTile(1, 1, 'X');
  assert(map.getTile(1, 1) === 'X', 'getTile should return set value');
  
  map.setTile(0, 0, 1);
  assert(map.getTile(0, 0) === 1, 'Should work with numbers');
  
  assert(map.getTile(10, 10) === undefined, 'Invalid position should return undefined');
  assert(map.setTile(10, 10, 'Y') === false, 'setTile should return false for invalid position');
  
  console.log('✓ getTile and setTile test passed');
}

function testIsValidPosition() {
  console.log('Testing isValidPosition...');
  const map = new GameMap(5, 5);
  
  assert(map.isValidPosition(0, 0) === true, 'Top-left corner should be valid');
  assert(map.isValidPosition(4, 4) === true, 'Bottom-right corner should be valid');
  assert(map.isValidPosition(2, 2) === true, 'Center should be valid');
  assert(map.isValidPosition(-1, 0) === false, 'Negative x should be invalid');
  assert(map.isValidPosition(0, -1) === false, 'Negative y should be invalid');
  assert(map.isValidPosition(5, 0) === false, 'x >= width should be invalid');
  assert(map.isValidPosition(0, 5) === false, 'y >= height should be invalid');
  
  console.log('✓ isValidPosition test passed');
}

function testFill() {
  console.log('Testing fill...');
  const map = new GameMap(3, 3, 0);
  
  map.fill(1);
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      assert(map.getTile(x, y) === 1, `Tile at (${x}, ${y}) should be 1`);
    }
  }
  
  console.log('✓ fill test passed');
}

function testGetNeighbors() {
  console.log('Testing getNeighbors...');
  const map = new GameMap(3, 3, 0);
  
  // Test center tile
  let neighbors = map.getNeighbors(1, 1);
  assert(neighbors.length === 4, 'Center should have 4 neighbors without diagonals');
  
  // Test corner tile
  neighbors = map.getNeighbors(0, 0);
  assert(neighbors.length === 2, 'Corner should have 2 neighbors without diagonals');
  
  // Test with diagonals
  neighbors = map.getNeighbors(1, 1, true);
  assert(neighbors.length === 8, 'Center should have 8 neighbors with diagonals');
  
  neighbors = map.getNeighbors(0, 0, true);
  assert(neighbors.length === 3, 'Corner should have 3 neighbors with diagonals');
  
  console.log('✓ getNeighbors test passed');
}

function testToString() {
  console.log('Testing toString...');
  const map = new GameMap(2, 2, 'X');
  const str = map.toString();
  assert(str.includes('X'), 'toString should include tile values');
  console.log('✓ toString test passed');
}

function testToArray() {
  console.log('Testing toArray...');
  const map = new GameMap(2, 2, 1);
  const arr = map.toArray();
  
  assert(Array.isArray(arr), 'toArray should return an array');
  assert(arr.length === 2, 'Array should have 2 rows');
  assert(arr[0].length === 2, 'Each row should have 2 elements');
  
  // Modifying returned array should not modify map
  arr[0][0] = 999;
  assert(map.getTile(0, 0) === 1, 'Modifying returned array should not modify map');
  
  console.log('✓ toArray test passed');
}

function runAllTests() {
  console.log('Running GameMap tests...\n');
  
  try {
    testConstructor();
    testGetSetTile();
    testIsValidPosition();
    testFill();
    testGetNeighbors();
    testToString();
    testToArray();
    
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runAllTests();
