const Tower = require('./tower');

function FlashTower(coord) {
  Tower.call(this, coord);
  this.damage = 5;
  this.range = 160;
  this.fireRateRef = 1600;
  this.fireRate = 1600;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 200;
  this.type = 'flashTower';
}

FlashTower.prototype = Object.create(Tower.prototype);

FlashTower.prototype.constructor = FlashTower;

FlashTower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  let enemiesToShoot = this.enemiesWithinRange(enemies);

  if (this.canShoot(currentTime) && enemiesToShoot.length > 0) {
    for (let enemy of enemiesToShoot) { enemy.hit(this.damage); }
    this.timeSinceLastShot = currentTime;
    return { enemy: null, tower: this };
  }
};

module.exports = FlashTower;
