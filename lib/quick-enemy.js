const SimpleEnemy = require('./simple-enemy');


var QuickEnemy = function (params) {
  SimpleEnemy.call(this, params);
  this.speedRef = 2.2;
  this.speed = 2.2;
  this.health = 11;
  this.price = 11;
  this.type = 'quickEnemy';
};

QuickEnemy.prototype = Object.create(SimpleEnemy.prototype);

QuickEnemy.prototype.constructor = QuickEnemy;

module.exports = QuickEnemy;
