const SimpleEnemy = require('./simple-enemy');


var QuickEnemy = function (params) {
  SimpleEnemy.call(this, params);
  this.speedRef = 1.5;
  this.speed = 1.5;
  this.health = 80;
  this.price = 15;
  this.type = 'quickEnemy';
};

QuickEnemy.prototype = Object.create(SimpleEnemy.prototype);

QuickEnemy.prototype.constructor = QuickEnemy;

module.exports = QuickEnemy;
