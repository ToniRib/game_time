var assert = require('chai').assert;
const SimpleEnemy = require('../lib/simple-enemy.js');

it('simple enemy is a function', function (){
  assert.typeOf(SimpleEnemy, 'function');
});

describe('enemy attributes', function() {
  it('has a x coord', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    assert.typeOf(enemy.x, 'number');
  });

  it('has a y coord', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    assert.typeOf(enemy.y, 'number');
  });

  it('has a speed', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    assert.typeOf(enemy.speed, 'number');
  });

  it('has health', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    assert.typeOf(enemy.health, 'number');
  });
});

describe('takes damage from a tower', function() {
  it('its health decreases by a given amount', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    enemy.hit(20);
    assert.equal(enemy.health, 80);
  });
});
