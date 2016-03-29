var assert = require('chai').assert;
const PathTile = require('../lib/path-tile.js');

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
