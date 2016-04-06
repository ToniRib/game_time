const Tower = require('./tower');

function SimpleTower(coord) {
  this.x = coord.x;
  this.y = coord.y;
  this.damage = 25;
  this.range = 110;
  this.fireRateRef = 1000;
  this.fireRate = 1250;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 125;
  this.type = 'simpleTower';
}

SimpleTower.prototype = Object.create(Tower.prototype);

SimpleTower.prototype.constructor = SimpleTower;

module.exports = SimpleTower;
