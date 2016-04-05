function Tower(coord) {
  this.x = coord.x;
  this.y = coord.y;
}

Tower.prototype.canShoot = function(currentTime) {
  let timeElapsed = currentTime - this.timeSinceLastShot;
  return timeElapsed >= this.fireRate;
};

Tower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  let enemyToShoot = this.selectEnemyToShoot(enemies);

  if (this.canShoot(currentTime) && enemyToShoot && enemyToShoot.active) {
    enemyToShoot.hit(this.damage);
    this.timeSinceLastShot = currentTime;
    return { enemy: enemyToShoot, tower: this };
  }
};

Tower.prototype.selectEnemyToShoot = function(enemies) {
  return this.enemiesWithinRange(enemies)[0];
};

Tower.prototype.inRange = function(enemy) {
  let dx = (enemy.x + 25) - this.x;
  let dy = (enemy.y + 25) - this.y;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.range, 2);
};

Tower.prototype.enemiesWithinRange = function(enemies) {
  return enemies.filter(function(enemy) {
    return this.inRange(enemy);
  }.bind(this));
};

Tower.prototype.isSimpleTower = function() {
  return this.type === 'simpleTower';
};

Tower.prototype.isFlashTower = function() {
  return this.type === 'flashTower';
};

Tower.prototype.isHeavyDamageTower = function() {
  return this.type === 'heavyDamageTower';
};

Tower.prototype.isContinuousFireTower = function() {
  return this.type === 'continuousFireTower';
};

module.exports = Tower;
