var assert = require('chai').assert;
const ToastEnemy = require('../lib/toast-enemy.js');

it('toast enemy is a function', function (){
  assert.typeOf(ToastEnemy, 'function');
});

describe('toast enemy attributes', function() {
  it('has a x coord', function() {
    let enemy = new ToastEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.x, 'number');
    assert.equal(1, enemy.x);
  });

  it('has a y coord', function() {
    let enemy = new ToastEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.y, 'number');
    assert.equal(2, enemy.y);
  });

  it('has a speed', function() {
    let enemy = new ToastEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.speed, 'number');
    assert.equal(0.8, enemy.speed);
  });

  it('has health', function() {
    let enemy = new ToastEnemy({ x: 1, y: 2 });
    assert.typeOf(enemy.health, 'number');
    assert.equal(175, enemy.health);
  });

  it('currentDirection is right by default', function() {
    let enemy = new ToastEnemy({ x: 1, y: 2 });
    assert.equal(enemy.currentDirection, 'right');
  });
});

describe('toast enemy takes damage from a tower', function() {
  it('its health decreases by a given amount', function() {
    let enemy = new ToastEnemy({ x: 1, y: 2 });
    enemy.hit(15);
    assert.equal(enemy.health, 160);
  });

  it('it dies if health dips to 0', function() {
    let enemy = new ToastEnemy({ x: 1, y: 2 });
    enemy.hit(300);
    assert.isNotTrue(enemy.alive);
  });
});

describe('toast enemy movement', function() {
  it('moves right by value of speed if currentDirection is right', function() {
    let enemy = new ToastEnemy({ x: 0, y: 0 });
    enemy.move();

    assert.equal(enemy.x, 0.8);
  });

  it('moves left by value of speed if currentDirection is left', function() {
    let enemy = new ToastEnemy({ x: 0, y: 0 });
    enemy.setDirection('left').move();

    assert.equal(enemy.x, -0.8);
  });

  it('moves up by value of speed if currentDirection is up', function() {
    let enemy = new ToastEnemy({ x: 0, y: 0 });
    enemy.setDirection('up').move();

    assert.equal(enemy.y, -0.8);
  });

  it('moves up by value of speed if currentDirection is down', function() {
    let enemy = new ToastEnemy({ x: 0, y: 0 });
    enemy.setDirection('down').move();

    assert.equal(enemy.y, 0.8);
  });
});
