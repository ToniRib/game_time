function SimpleTower(coord) {
  this.x = coord['x'];
  this.y = coord['y'];
  this.damage = 10;
  this.range = 4;
  this.fireRate = 1000;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
}

SimpleTower.prototype.canShoot = function(currentTime) {
  let timeElapsed = currentTime - this.timeSinceLastShot;
  return timeElapsed >= this.fireRate;
};

SimpleTower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  if (this.canShoot(currentTime)) {
    this.selectEnemyToShoot(enemies).hit(this.damage);
    this.timeSinceLastShot = currentTime;
  }
};

SimpleTower.prototype.selectEnemyToShoot = function(enemies) {
  return this.enemiesWithinRange(enemies)[0];
};

SimpleTower.prototype.inRange = function(enemy) {
  let dx = enemy.x - this.x;
  let dy = enemy.y - this.y;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.range, 2);
};

SimpleTower.prototype.enemiesWithinRange = function(enemies) {
  var that = this;
  return enemies.filter(function(enemy) {
    return that.inRange(enemy);
  });
};

module.exports = SimpleTower;
