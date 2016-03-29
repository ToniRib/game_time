var assert = require('chai').assert;
const Tile = require('../lib/tile.js');

it('tile is a function', function (){
  assert.typeOf(Tile, 'function');
});

describe('tile attributes', function() {
  it('has a x coord', function() {
    let tile = new Tile({ x: 1, y: 2 });
    assert.typeOf(tile.x, 'number');
    assert.equal(tile.x, 1);
  });

  it('has a y coord', function() {
    let tile = new Tile({ x: 1, y: 2 });
    assert.typeOf(tile.y, 'number');
    assert.equal(tile.y, 2);
  });

  it('has a width of 50 by default', function() {
    let tile = new Tile({ x: 1, y: 2 });
    assert.equal(tile.width, 50);
  });

  it('has a height of 50 by default', function() {
    let tile = new Tile({ x: 1, y: 2 });
    assert.equal(tile.height, 50);
  });

  it('has can return center', function() {
    let tile = new Tile({ x: 0, y: 0 });
    assert.equal(tile.centerX(), 25);
    assert.equal(tile.centerY(), 25);
  });
});
