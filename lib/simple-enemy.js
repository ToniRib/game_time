var SimpleEnemy = function (coord) {
  this.x = coord['x'];
  this.y = coord['y'];
  this.speed = 1;
  this.health = 100;
};

module.exports = SimpleEnemy;
