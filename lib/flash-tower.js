const SimpleTower = require('./simple-tower');

function FlashTower(coord) {
  SimpleTower.call(this, coord);
  this.damage = 10;
  this.range = 120;
  this.fireRate = 700;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
}

FlashTower.prototype = Object.create(SimpleTower.prototype);

FlashTower.prototype.constructor = FlashTower;

FlashTower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  let enemiesToShoot = this.enemiesWithinRange(enemies);
  if (this.canShoot(currentTime) && enemiesToShoot) {
    for(let enemy of enemiesToShoot){
      enemy.hit(this.damage);
    }
    this.timeSinceLastShot = currentTime;
  }
};

module.exports = FlashTower;
