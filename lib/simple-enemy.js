var SimpleEnemy = function (coord) {
  this.x = coord.x;
  this.y = coord.y;
  this.speed = 1;
  this.health = 100;
  this.alive = true;
  this.active = true;
  this.currentDirection = 'right';
  this.price = 20;
};

SimpleEnemy.prototype.hit = function(damageAmount) {
  this.health = this.health - damageAmount;
  if ( this.health <= 0 ) { this.alive = false; }
  return this;
};

SimpleEnemy.prototype.setDirection = function(direction) {
  this.currentDirection = direction;
  return this;
};

SimpleEnemy.prototype.move = function() {
  if (this.currentDirection === 'right') {
    this.moveRight();
  } else if (this.currentDirection === 'left') {
    this.moveLeft();
  } else if (this.currentDirection === 'up') {
    this.moveUp();
  } else if (this.currentDirection === 'down') {
    this.moveDown();
  }
};


SimpleEnemy.prototype.moveRight = function() {
  this.x = this.x + this.speed;
};

SimpleEnemy.prototype.moveLeft = function() {
  this.x = this.x - this.speed;
};

SimpleEnemy.prototype.moveUp = function() {
  this.y = this.y - this.speed;
};

SimpleEnemy.prototype.moveDown = function() {
  this.y = this.y + this.speed;
};

module.exports = SimpleEnemy;
