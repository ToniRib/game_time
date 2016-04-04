const SimpleEnemy = require('./simple-enemy');

var MonsterEnemy = function (params) {
  SimpleEnemy.call(this, params);
  this.speedRef = 0.2;
  this.speed = 0.2;
  this.health = 500;
  this.price = 100;
  this.type = 'monsterEnemy';
};

MonsterEnemy.prototype = Object.create(SimpleEnemy.prototype);

MonsterEnemy.prototype.constructor = MonsterEnemy;

module.exports = MonsterEnemy;
