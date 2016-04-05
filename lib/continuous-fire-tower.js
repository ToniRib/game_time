function ContinuousFireTower(coord) {
  this.x = coord.x;
  this.y = coord.y;
  this.damage = 4;
  this.range = 90;
  this.fireRateRef = 200;
  this.fireRate = 200;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 150;
  this.type = 'continuousFireTower';
}

ContinuousFireTower.prototype.canShoot = function(currentTime) {
  let timeElapsed = currentTime - this.timeSinceLastShot;
  return timeElapsed >= this.fireRate;
};

ContinuousFireTower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  let enemyToShoot = this.selectEnemyToShoot(enemies);
  if (this.canShoot(currentTime) && enemyToShoot && enemyToShoot.active) {
    enemyToShoot.hit(this.damage);
    this.timeSinceLastShot = currentTime;
    return {enemy: enemyToShoot, tower: this};
  }
};

ContinuousFireTower.prototype.selectEnemyToShoot = function(enemies) {
  return this.enemiesWithinRange(enemies)[0];
};

ContinuousFireTower.prototype.inRange = function(enemy) {
  let dx = (enemy.x + 25) - this.x;
  let dy = (enemy.y + 25) - this.y;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.range, 2);
};

ContinuousFireTower.prototype.enemiesWithinRange = function(enemies) {
  return enemies.filter(enemy => this.inRange(enemy)).bind(this);
};

module.exports = ContinuousFireTower;
