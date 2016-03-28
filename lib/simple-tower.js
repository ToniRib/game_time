function SimpleTower(coord) {
  this.x = coord['x'];
  this.y = coord['y'];
  this.damage = 10;
  this.range = 4;
  this.fireRate = 1000;
}

module.exports = SimpleTower;
