var assert = require('chai').assert;
const FlashTower = require('../lib/flash-tower.js');
const SimpleEnemy = require('../lib/simple-enemy.js');

it('flash tower is a function', function () {
  assert.typeOf(FlashTower, 'function');
});

describe('flash tower attributes', function () {
  it('tower has a damage amount', function (){
    let tower = new FlashTower({ x: 1, y: 1 });
    assert.typeOf(tower.damage, 'number');
    assert.equal(5, tower.damage);
  });

  it('tower has a range', function () {
    let tower = new FlashTower({ x: 1, y: 1 });
    assert.typeOf(tower.range, 'number');
    assert.equal(160, tower.range);
  });

  it('tower has a fire-rate', function () {
    let tower = new FlashTower({ x: 1, y: 1 });
    assert.typeOf(tower.fireRate, 'number');
    assert.equal(1600, tower.fireRate);
  });

  it('tower has an x coord', function () {
    let tower = new FlashTower({ x: 1, y: 1 });
    assert.typeOf(tower.x, 'number');
    assert.equal(1, tower.x);
  });

  it('tower has an y coord', function () {
    let tower = new FlashTower({ x: 1, y: 1 });
    assert.typeOf(tower.y, 'number');
    assert.equal(1, tower.y);
  });

  it('is a flash tower', function() {
    let tower = new FlashTower({ x: 1, y: 1 });
    assert(tower.isFlashTower());
  });
});

describe('flash tower shoot functionality', function() {
  it('can shoot upon creation', function() {
    let tower = new FlashTower({ x: 1, y: 2 });
    let currentTime = new Date().getTime();
    assert(tower.canShoot(currentTime), "Tower cannot shoot");
  });

  it('updates the time since the last shot if it shoots', function() {
    let tower = new FlashTower({ x: 1, y: 2 });
    let enemy1 = new SimpleEnemy({ x: 5, y: 2 });
    let enemy2 = new SimpleEnemy({ x: -2, y:  2});
    let firstShot = tower.timeSinceLastShot;
    tower.shoot([enemy1, enemy2]);
    let lastShot = tower.timeSinceLastShot;
    assert.notEqual(firstShot, lastShot, "Tower did not shoot");
  });

  it('cannot shoot if enough time has not elapsed', function() {
    let tower = new FlashTower({ x: 1, y: 2 });
    let currentTime = new Date().getTime();
    tower.fireRate = 100000;
    assert.isNotTrue(tower.canShoot(currentTime));
  });

  describe('range functionality', function(){
    it('enemy is in range', function(){
      let tower = new FlashTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy = new SimpleEnemy({ x: 10, y: 10 });
      assert(tower.inRange(enemy));
    });

    it('enemy is in range at edge of range', function(){
      let tower = new FlashTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy = new SimpleEnemy({ x: 0, y: 15 });
      assert(tower.inRange(enemy));
    });

    it('enemy is not in range', function(){
      let tower = new FlashTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy = new SimpleEnemy({ x: 100, y: 10 });
      assert.isNotTrue(tower.inRange(enemy));
    });

    it('returns a list of enemies within the tower range', function() {
      let tower = new FlashTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy1 = new SimpleEnemy({ x: 5, y: 2 });
      let enemy2 = new SimpleEnemy({ x: -2, y: 2 });
      let enemy3 = new SimpleEnemy({ x: 100, y: 2 });

      let enemiesInRange = tower.enemiesWithinRange([enemy1, enemy2, enemy3]);

      assert.equal(enemiesInRange.length, 2);
      assert.equal(enemiesInRange[0], enemy1);
      assert.equal(enemiesInRange[1], enemy2);
    });

    it('does damage to all enemies in range when it shoots', function() {
      let tower = new FlashTower({ x: 1, y: 2 });
      tower.range = 4;

      let enemy1 = new SimpleEnemy({ x: 5, y: 2 });
      let enemy2 = new SimpleEnemy({ x: -2, y: 2 });
      let enemy3 = new SimpleEnemy({ x: 15, y: 2 });

      let enemiesInRange = tower.enemiesWithinRange([enemy1, enemy2, enemy3]);
      tower.shoot(enemiesInRange);

      assert.equal(50, enemy1.health);
      assert.equal(50, enemy2.health);
    });
  });
});
