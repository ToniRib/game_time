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

  it('currentDirection is right by default', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    assert.equal(enemy.currentDirection, 'right');
  });
});

describe('takes damage from a tower', function() {
  it('its health decreases by a given amount', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    enemy.hit(20);
    assert.equal(enemy.health, 80);
  });

  it('it dies if health dips to 0', function() {
    let enemy = new SimpleEnemy({x: 1, y: 2});
    enemy.hit(110);
    assert.isNotTrue(enemy.alive);
  });
});

describe('enemy movement', function() {
  it('moves right by value of speed if currentDirection is right', function() {
    let enemy = new SimpleEnemy({x: 0, y: 0});
    enemy.move();

    assert.equal(enemy.x, 1);
  });

  it('moves left by value of speed if currentDirection is left', function() {
    let enemy = new SimpleEnemy({x: 1, y: 0});
    enemy.setDirection('left').move();

    assert.equal(enemy.x, 0);
  });

  it('moves up by value of speed if currentDirection is up', function() {
    let enemy = new SimpleEnemy({x: 0, y: 1});
    enemy.setDirection('up').move();

    assert.equal(enemy.y, 0);
  });

  it('moves up by value of speed if currentDirection is down', function() {
    let enemy = new SimpleEnemy({x: 0, y: 0});
    enemy.setDirection('down').move();

    assert.equal(enemy.y, 1);
  });
});
