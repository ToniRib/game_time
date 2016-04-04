function HeaveyDamageTower(coord) {
  this.x = coord.x;
  this.y = coord.y;
  this.damage = 50;
  this.range = 125;
  this.fireRateRef = 2000;
  this.fireRate = 2000;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 125;
}

HeaveyDamageTower.prototype.canShoot = function(currentTime) {
  let timeElapsed = currentTime - this.timeSinceLastShot;
  return timeElapsed >= this.fireRate;
};

HeaveyDamageTower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  let enemyToShoot = this.selectEnemyToShoot(enemies);
  if (this.canShoot(currentTime) && enemyToShoot && enemyToShoot.active) {
    enemyToShoot.hit(this.damage);
    this.timeSinceLastShot = currentTime;
  }
};

HeaveyDamageTower.prototype.selectEnemyToShoot = function(enemies) {
  return this.enemiesWithinRange(enemies)[0];
};

HeaveyDamageTower.prototype.inRange = function(enemy) {
  let dx = enemy.x - this.x;
  let dy = enemy.y - this.y;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.range, 2);
};

HeaveyDamageTower.prototype.enemiesWithinRange = function(enemies) {
  return enemies.filter(function(enemy) {
    return this.inRange(enemy);
  }.bind(this));
};

module.exports = HeaveyDamageTower;
