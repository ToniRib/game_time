const SimpleEnemy = require('./simple-enemy');

var MonsterEnemy = function (params) {
  SimpleEnemy.call(this, params);
  this.speedRef = 0.3;
  this.speed = 0.3;
  this.health = 1000;
  this.price = 75;
  this.type = 'monsterEnemy';
};

MonsterEnemy.prototype = Object.create(SimpleEnemy.prototype);

MonsterEnemy.prototype.constructor = MonsterEnemy;

module.exports = MonsterEnemy;
