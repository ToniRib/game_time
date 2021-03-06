var assert = require('chai').assert;
const BuildTile = require('../lib/build-tile');
const SimpleTower = require('../lib/simple-tower');

it('BuildTile is a function', function (){
  assert.typeOf(BuildTile, 'function');
});

describe('buildTile attributes', function() {
  it('has a x coord', function() {
    let buildTile = new BuildTile({ x: 1, y: 2 });
    assert.typeOf(buildTile.x, 'number');
    assert.equal(buildTile.x, 1);
  });

  it('has a y coord', function() {
    let buildTile = new BuildTile({ x: 1, y: 2 });
    assert.typeOf(buildTile.y, 'number');
    assert.equal(buildTile.y, 2);
  });

  it('has a width of 50 by default', function() {
    let buildTile = new BuildTile({ x: 1, y: 2 });
    assert.equal(buildTile.width, 50);
  });

  it('has a height of 50 by default', function() {
    let buildTile = new BuildTile({ x: 1, y: 2 });
    assert.equal(buildTile.height, 50);
  });

  it('is vacant by default', function() {
    let buildTile = new BuildTile({ x: 1, y: 2 });
    assert(buildTile.vacant);
  });
});

describe('adds a tower to site', function() {
  it('can add a tower if vacant and a build site', function() {
    let buildTile = new BuildTile({ x: 0, y: 0 });
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });
    buildTile.addTower(simpleTower);
    assert.typeOf(buildTile.tower, 'object');
  });

  it('cant add a tower to a filled build site', function() {
    let buildTile = new BuildTile({ x: 0, y: 0 });
    buildTile.vacant = false;
    buildTile.tower = 'fakeTower';
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });
    buildTile.addTower(simpleTower);
    assert.typeOf(buildTile.tower, 'string');
  });

  it('has correct origin point', function() {
    let buildTile = new BuildTile({ x: 50, y: 50 });
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });
    buildTile.addTower(simpleTower);
    assert.equal(buildTile.tower.y, 75);
    assert.equal(buildTile.tower.x, 75);
  });
});

describe('removes a tower from site', function() {
  it('sets the tower to null', function() {
    let buildTile = new BuildTile({ x: 50, y: 50 });
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });
    buildTile.addTower(simpleTower);
    buildTile.removeTower();

    assert.equal(null, buildTile.tower);
  });

  it('sets vacant to true', function() {
    let buildTile = new BuildTile({ x: 50, y: 50 });
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });
    buildTile.addTower(simpleTower);
    buildTile.removeTower();

    assert(buildTile.vacant);
  });
});
