var assert = require('chai').assert;
const SimpleTower = require('../lib/simple-tower.js');

it('tower is a function', function (){
  assert.typeOf(SimpleTower, 'function');
});

describe('tower attributes', function (){

  it('tower has a damage amount', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.damage, 'number');
  });

  it('tower has a range', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.range, 'number');
  });

  it('tower has a fire-rate', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.fireRate, 'number');
  });

  it('tower has an x coord', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.x, 'number');
  });

  it('tower has an y coord', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.y, 'number');
  });

});

describe('shoot functionality', function() {
  it('can shoot upon creation', function() {
    let tower = new SimpleTower({x: 1, y: 2});
    let currentTime = new Date().getTime();
    assert(tower.canShoot(currentTime), "Tower cannot shoot");
  });

  it('updates the time since the last shot if it shoots', function() {
    let tower = new SimpleTower({x: 1, y: 2});
    let firstShot = tower.timeSinceLastShot;
    tower.shoot();
    let lastShot = tower.timeSinceLastShot;
    assert.notEqual(firstShot, lastShot, "Tower did not shoot");
  });
});
