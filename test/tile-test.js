var assert = require('chai').assert;
const Tile = require('../lib/tile.js');

it('game is a function', function (){
  assert.typeOf(Tile, 'function');
});

describe('tile attributes', function() {
  it('has a x coord', function() {
    let tile = new Tile({ isBuildSite: true }, { x: 1, y: 2 });
    assert.typeOf(tile.x, 'number');
    assert.equal(tile.x, 1);
  });

  it('has a y coord', function() {
    let tile = new Tile({ isBuildSite: true }, { x: 1, y: 2 });
    assert.typeOf(tile.y, 'number');
    assert.equal(tile.y, 2);
  });

  it('is vacant by default', function() {
    let tile = new Tile({ isBuildSite: true }, { x: 1, y: 2 });
    assert(tile.vacant);
  });

  it('has a width of 50 by default', function() {
    let tile = new Tile({ isBuildSite: true }, { x: 1, y: 2 });
    assert.equal(tile.width, 50);
  });

  it('has a height of 50 by default', function() {
    let tile = new Tile({ isBuildSite: true }, { x: 1, y: 2 });
    assert.equal(tile.height, 50);
  });

  it('is a build site', function() {
    let tile = new Tile({ isBuildSite: true }, { x: 1, y: 2 });
    assert(tile.buildSite);
  });
});

describe('adds a tower to site', function() {
  it('can add a tower if vacant and a build site', function() {
    let tile = new Tile({ isBuildSite: true }, { x: 1, y: 2 });
    tile.addTower('simple');
    assert.typeOf(tile.tower, 'object');
  });
});
