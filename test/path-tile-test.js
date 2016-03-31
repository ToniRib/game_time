var assert = require('chai').assert;
const PathTile = require('../lib/path-tile.js');
const SimpleEnemy = require('../lib/simple-enemy.js');

it('tile is a function', function (){
  assert.typeOf(PathTile, 'function');
});

describe('path tile attributes', function() {
  it('is not a turn point by default', function() {
    let pathTile = new PathTile({ x: 0, y: 0 });
    assert.isNotTrue(pathTile.isTurnPoint);
    assert.equal(pathTile.turnDirection, null);
  });

  it('can take a turn point boolean', function() {
    let pathTile = new PathTile({ x: 0, y: 0 }, true, 'up');
    assert(pathTile.isTurnPoint);
    assert.equal(pathTile.turnDirection, 'up');
  });
});

describe('path tile enemy detection', function(){
  it('can find enemies in range', function(){
    let pathTile = new PathTile({x: 100, y: 100}, true, 'up');
    let enemy = new SimpleEnemy({x: 102, y: 101});
    let enemy2 = new SimpleEnemy({x: 200, y: 200});
    let enemiesInRange = pathTile.enemiesInRange([enemy, enemy2]);

    assert.equal(enemiesInRange.length, 1);
    assert.equal(enemiesInRange[0], enemy);
  });

  it('can tell if an enemy is within range', function(){
    let pathTile = new PathTile({x: 100, y: 100}, true, 'up');
    let enemy = new SimpleEnemy({x: 102, y: 101});
    assert(pathTile.inRange(enemy));
  });
});
