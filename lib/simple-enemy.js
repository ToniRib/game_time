var SimpleEnemy = function (coord) {
  this.x = coord['x'];
  this.y = coord['y'];
  this.speed = 1;
  this.health = 100;
  // this.alive = true;
};

SimpleEnemy.prototype.hit = function(damageAmount) {
  this.health = this.health - damageAmount;
  return this;
};

module.exports = SimpleEnemy;
