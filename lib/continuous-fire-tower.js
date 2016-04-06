const Tower = require('./tower');

function ContinuousFireTower(coord) {
  Tower.call(this, coord);
  this.damage = 5;
  this.range = 90;
  this.fireRateRef = 200;
  this.fireRate = 200;
  this.timeSinceLastShot = (new Date().getTime()) - this.fireRate;
  this.price = 150;
  this.type = 'continuousFireTower';
}

ContinuousFireTower.prototype = Object.create(Tower.prototype);

ContinuousFireTower.prototype.constructor = ContinuousFireTower;

module.exports = ContinuousFireTower;
