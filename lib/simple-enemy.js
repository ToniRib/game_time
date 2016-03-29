var SimpleEnemy = function (coord) {
  this.x = coord['x'];
  this.y = coord['y'];
  this.speed = 1;
  this.health = 100;
  this.alive = true;
};

SimpleEnemy.prototype.hit = function(damageAmount) {
  this.health = this.health - damageAmount;
  if ( this.health <= 0 ) { this.alive = false; }  
  return this;
};

module.exports = SimpleEnemy;
