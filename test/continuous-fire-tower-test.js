var assert = require('chai').assert;
const ContinuousFireTower = require('../lib/continuous-fire-tower.js');
const SimpleEnemy = require('../lib/simple-enemy.js');

it('continuous fire tower tower is a function', function (){
  assert.typeOf(ContinuousFireTower, 'function');
});

describe('continuous fire tower tower attributes', function (){
  it('tower has a damage amount', function (){
    let tower = new ContinuousFireTower({x: 1, y: 1});
    assert.typeOf(tower.damage, 'number');
  });

  it('tower has a range', function (){
    let tower = new ContinuousFireTower({x: 1, y: 1});
    assert.typeOf(tower.range, 'number');
  });

  it('tower has a fire-rate', function (){
    let tower = new ContinuousFireTower({x: 1, y: 1});
    assert.typeOf(tower.fireRate, 'number');
  });

  it('tower has an x coord', function (){
    let tower = new ContinuousFireTower({x: 1, y: 1});
    assert.typeOf(tower.x, 'number');
  });

  it('tower has an y coord', function (){
    let tower = new ContinuousFireTower({x: 1, y: 1});
    assert.typeOf(tower.y, 'number');
  });

});

describe('continuous fire tower shoot functionality', function() {
  it('can shoot upon creation', function() {
    let tower = new ContinuousFireTower({x: 1, y: 2});
    let currentTime = new Date().getTime();
    assert(tower.canShoot(currentTime), "Tower cannot shoot");
  });

  it('updates the time since the last shot if it shoots', function() {
    let tower = new ContinuousFireTower({x: 1, y: 2});
    let enemy1 = new SimpleEnemy({x: 5, y: 2});
    let enemy2 = new SimpleEnemy({x: -2, y: 2});
    let firstShot = tower.timeSinceLastShot;
    tower.shoot([enemy1, enemy2]);
    let lastShot = tower.timeSinceLastShot;
    assert.notEqual(firstShot, lastShot, "Tower did not shoot");
  });

  it('cannot shoot if enough time has not elapsed', function() {
    let tower = new ContinuousFireTower({x: 1, y: 2});
    let currentTime = new Date().getTime();
    tower.fireRate = 100000;
    assert.isNotTrue(tower.canShoot(currentTime));
  });

  describe('continuous fire tower range functionality', function(){
    it('enemy is in range', function(){
      let tower = new ContinuousFireTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy = new SimpleEnemy({ x: 10, y: 10 });
      assert(tower.inRange(enemy));
    });

    it('enemy is in range at edge of range', function(){
      let tower = new ContinuousFireTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy = new SimpleEnemy({ x: 0, y: 15 });
      assert(tower.inRange(enemy));
    });

    it('enemy is not in range', function(){
      let tower = new ContinuousFireTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy = new SimpleEnemy({ x: 100, y: 10 });
      assert.isNotTrue(tower.inRange(enemy));
    });

    it('returns a list of enemies within the tower range', function() {
      let tower = new ContinuousFireTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy1 = new SimpleEnemy({ x: 5, y: 2 });
      let enemy2 = new SimpleEnemy({ x: -2, y: 2 });
      let enemy3 = new SimpleEnemy({ x: 100, y: 2 });

      let enemiesInRange = tower.enemiesWithinRange([enemy1, enemy2, enemy3]);

      assert.equal(enemiesInRange.length, 2);
      assert.equal(enemiesInRange[0], enemy1);
      assert.equal(enemiesInRange[1], enemy2);
    });

    it('selects first enemy in range', function() {
      let tower = new ContinuousFireTower({ x: 0, y: 0 });
      tower.range = 50;
      let enemy1 = new SimpleEnemy({ x: 5, y: 2 });
      let enemy2 = new SimpleEnemy({ x: -2, y: 2 });
      let enemy3 = new SimpleEnemy({ x: 100, y: 2 });

      let enemySelected = tower.selectEnemyToShoot([enemy1, enemy2, enemy3]);
      assert.equal(enemySelected, enemy1);
    });

    it('does damage to an enemy when it shoots', function() {
      let tower = new ContinuousFireTower({x: 1, y: 2});
      tower.range = 4;
      tower.damage = 5;
      let enemy1 = new SimpleEnemy({x: 5, y: 2});

      tower.shoot([enemy1]);

      assert.equal(enemy1.health, 50);
    });
  });
});
