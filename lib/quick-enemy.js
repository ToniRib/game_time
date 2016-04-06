const SimpleEnemy = require('./simple-enemy');


var QuickEnemy = function (params) {
  SimpleEnemy.call(this, params);
  this.speedRef = 2.3;
  this.speed = 2.3;
  this.health = 13;
  this.price = 13;
  this.type = 'quickEnemy';
};

QuickEnemy.prototype = Object.create(SimpleEnemy.prototype);

QuickEnemy.prototype.constructor = QuickEnemy;

module.exports = QuickEnemy;
