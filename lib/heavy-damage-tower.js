const Tower = require('./tower');

function HeavyDamageTower(coord) {
  Tower.call(this, coord);
  this.damage = 50;
  this.range = 125;
  this.fireRateRef = 2000;
  this.fireRate = 2000;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 175;
  this.type = 'heavyDamageTower';
}

HeavyDamageTower.prototype = Object.create(Tower.prototype);

HeavyDamageTower.prototype.constructor = HeavyDamageTower;

module.exports = HeavyDamageTower;
