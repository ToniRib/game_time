var assert = require('chai').assert;
const HeavyDamageTower = require('../lib/heavy-damage-tower.js');
const SimpleEnemy = require('../lib/simple-enemy.js');

it('heavy damage tower is a function', function (){
  assert.typeOf(HeavyDamageTower, 'function');
});

describe('heavy damage tower attributes', function (){
  it('tower has a damage amount', function (){
    let tower = new HeavyDamageTower({x: 1, y: 1});
    assert.typeOf(tower.damage, 'number');
  });

  it('tower has a range', function (){
    let tower = new HeavyDamageTower({x: 1, y: 1});
    assert.typeOf(tower.range, 'number');
  });

  it('tower has a fire-rate', function (){
    let tower = new HeavyDamageTower({x: 1, y: 1});
    assert.typeOf(tower.fireRate, 'number');
  });

  it('tower has an x coord', function (){
    let tower = new HeavyDamageTower({x: 1, y: 1});
    assert.typeOf(tower.x, 'number');
  });

  it('tower has a y coord', function (){
    let tower = new HeavyDamageTower({x: 1, y: 1});
    assert.typeOf(tower.y, 'number');
  });

  it('tower has a price', function (){
    let tower = new HeavyDamageTower({x: 1, y: 1});
    assert.typeOf(tower.price, 'number');
  });
});

describe('heavy damage tower shoot functionality', function() {
  it('can shoot upon creation', function() {
    let tower = new HeavyDamageTower({x: 1, y: 2});
    let currentTime = new Date().getTime();
    assert(tower.canShoot(currentTime), "Tower cannot shoot");
  });

  it('updates the time since the last shot if it shoots', function() {
    let tower = new HeavyDamageTower({x: 1, y: 2});
    let enemy1 = new SimpleEnemy({x: 5, y: 2});
    let enemy2 = new SimpleEnemy({x: -2, y: 2});

    let firstShot = tower.timeSinceLastShot;
    tower.shoot([enemy1, enemy2]);

    let lastShot = tower.timeSinceLastShot;
    assert.notEqual(firstShot, lastShot, "Tower did not shoot");
  });

  it('cannot shoot if enough time has not elapsed', function() {
    let tower = new HeavyDamageTower({x: 1, y: 2});
    let currentTime = new Date().getTime();
    tower.fireRate = 100000;

    assert.isNotTrue(tower.canShoot(currentTime));
  });

  describe('heavy damage tower range functionality', function(){
    it('enemy is in range', function(){
      let tower = new HeavyDamageTower({x: 1, y: 2});
      tower.range = 4;
      let enemy = new SimpleEnemy({x: 2, y: 2});

      assert(tower.inRange(enemy));
    });

    it('enemy is in range at edge of range', function(){
      let tower = new HeavyDamageTower({x: 1, y: 2});
      tower.range = 4;
      let enemy = new SimpleEnemy({x: 5, y: 2});

      assert(tower.inRange(enemy));
    });

    it('enemy is not in range', function(){
      let tower = new HeavyDamageTower({x: 1, y: 2});
      tower.range = 4;
      let enemy = new SimpleEnemy({x: 100, y: 100});

      assert.isNotTrue(tower.inRange(enemy));
    });

    it('returns a list of enemies within the tower range', function() {
      let tower = new HeavyDamageTower({x: 1, y: 2});
      tower.range = 4;
      let enemy1 = new SimpleEnemy({x: 5, y: 2});
      let enemy2 = new SimpleEnemy({x: -2, y: 2});
      let enemy3 = new SimpleEnemy({x: 15, y: 2});

      let enemiesInRange = tower.enemiesWithinRange([enemy1, enemy2, enemy3]);

      assert.equal(enemiesInRange.length, 2);
      assert.equal(enemiesInRange[0], enemy1);
      assert.equal(enemiesInRange[1], enemy2);
    });

    it('selects first enemy in range', function() {
      let tower = new HeavyDamageTower({x: 1, y: 2});
      tower.range = 4;
      let enemy1 = new SimpleEnemy({x: 5, y: 2});
      let enemy2 = new SimpleEnemy({x: -2, y: 2});
      let enemy3 = new SimpleEnemy({x: 15, y: 2});

      let enemySelected = tower.selectEnemyToShoot([enemy1, enemy2, enemy3]);
      assert.equal(enemySelected, enemy1);
    });

    it('does damage to an enemy when it shoots', function() {
      let tower = new HeavyDamageTower({x: 1, y: 2});
      tower.range = 4;
      tower.damage = 10;
      let enemy1 = new SimpleEnemy({x: 5, y: 2});

      tower.shoot([enemy1]);

      assert.equal(enemy1.health, 90);
    });
  });
});
