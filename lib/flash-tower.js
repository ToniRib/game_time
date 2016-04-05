const SimpleTower = require('./simple-tower');

function FlashTower(coord) {
  SimpleTower.call(this, coord);
  this.damage = 10;
  this.range = 140;
  this.fireRateRef = 1000;
  this.fireRate = 1000;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 175;
  this.type = 'flashTower';
}

FlashTower.prototype = Object.create(SimpleTower.prototype);

FlashTower.prototype.constructor = FlashTower;

FlashTower.prototype.shoot = function(enemies) {
  let currentTime = new Date().getTime();
  let enemiesToShoot = this.enemiesWithinRange(enemies);

  if (this.canShoot(currentTime) && enemiesToShoot.length > 0) {
    for(let enemy of enemiesToShoot){ enemy.hit(this.damage); }
    this.timeSinceLastShot = currentTime;
    console.log(enemiesToShoot);
    return {enemy: null, tower: this};
  }
};

module.exports = FlashTower;
