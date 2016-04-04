const SimpleEnemy = require('./simple-enemy');

var ToastEnemy = function (params) {
  SimpleEnemy.call(this, params);
  this.speedRef = 1;
  this.speed = 1;
  this.health = 175;
  this.price = 40;
  this.type = 'toastEnemy';
};

ToastEnemy.prototype = Object.create(SimpleEnemy.prototype);

ToastEnemy.prototype.constructor = ToastEnemy;

module.exports = ToastEnemy;
