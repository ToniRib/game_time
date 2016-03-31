const SimpleEnemy = require('./simple-enemy');


var QuickEnemy = function (params) {
  SimpleEnemy.call(this, params);
  this.speed = 1.5;
  this.health = 60;
  this.price = 30;
};

QuickEnemy.prototype = Object.create(SimpleEnemy.prototype);

QuickEnemy.prototype.constructor = QuickEnemy;

module.exports = QuickEnemy;
