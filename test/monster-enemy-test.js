var assert = require('chai').assert;
const MonsterEnemy = require('../lib/monster-enemy.js');

it('monster enemy is a function', function (){
  assert.typeOf(MonsterEnemy, 'function');
});

describe('monster enemy attributes', function() {
  it('has a x coord', function() {
    let enemy = new MonsterEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.x, 'number');
    assert.equal(1, enemy.x);
  });

  it('has a y coord', function() {
    let enemy = new MonsterEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.y, 'number');
    assert.equal(2, enemy.y);
  });

  it('has a speed', function() {
    let enemy = new MonsterEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.speed, 'number');
    assert.equal(0.2, enemy.speed);
  });

  it('has health', function() {
    let enemy = new MonsterEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.health, 'number');
    assert.equal(500, enemy.health);
  });

  it('currentDirection is right by default', function() {
    let enemy = new MonsterEnemy({ x: 1, y: 2 });
    assert.equal(enemy.currentDirection, 'right');
  });
});

describe('monster enemy takes damage from a tower', function() {
  it('its health decreases by a given amount', function() {
    let enemy = new MonsterEnemy({ x: 1, y: 2 });
    enemy.hit(20);
    assert.equal(enemy.health, 480);
  });

  it('it dies if health dips to 0', function() {
    let enemy = new MonsterEnemy({ x: 1, y: 2 });
    enemy.hit(1000);
    assert.isNotTrue(enemy.alive);
  });
});

describe('monster enemy movement', function() {
  it('moves right by value of speed if currentDirection is right', function() {
    let enemy = new MonsterEnemy({ x: 0, y: 0 });
    enemy.move();

    assert.equal(enemy.x, 0.2);
  });

  it('moves left by value of speed if currentDirection is left', function() {
    let enemy = new MonsterEnemy({ x: 0, y: 0 });
    enemy.setDirection('left').move();

    assert.equal(enemy.x, -0.2);
  });

  it('moves up by value of speed if currentDirection is up', function() {
    let enemy = new MonsterEnemy({ x: 0, y: 0 });
    enemy.setDirection('up').move();

    assert.equal(enemy.y, -0.2);
  });

  it('moves up by value of speed if currentDirection is down', function() {
    let enemy = new MonsterEnemy({ x: 0, y: 0 });
    enemy.setDirection('down').move();

    assert.equal(enemy.y, 0.2);
  });
});
