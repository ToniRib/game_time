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
    this.timeSinceLastShot = currentTime;
  }
};

module.exports = SimpleTower;
