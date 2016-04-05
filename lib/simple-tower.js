function SimpleTower(coord) {
  this.x = coord.x;
  this.y = coord.y;
  this.damage = 25;
  this.range = 100;
  this.fireRateRef = 1000;
  this.fireRate = 1000;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 100;
  this.type = 'simpleTower';
}

SimpleTower.prototype.canShoot = function(currentTime) {
  let timeElapsed = currentTime - this.timeSinceLastShot;
  return timeElapsed >= this.fireRate;
};

SimpleTower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  let enemyToShoot = this.selectEnemyToShoot(enemies);
  if (this.canShoot(currentTime) && enemyToShoot && enemyToShoot.active) {
    enemyToShoot.hit(this.damage);
    this.timeSinceLastShot = currentTime;
    return {enemy: enemyToShoot, tower: this};
  }
};

SimpleTower.prototype.selectEnemyToShoot = function(enemies) {
  return this.enemiesWithinRange(enemies)[0];
};

SimpleTower.prototype.inRange = function(enemy) {
  let dx = (enemy.x + 25) - this.x;
  let dy = (enemy.y + 25) - this.y;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.range, 2);
};

SimpleTower.prototype.enemiesWithinRange = function(enemies) {
  return enemies.filter(function(enemy) {
    return this.inRange(enemy);
  }.bind(this));
};

module.exports = SimpleTower;
