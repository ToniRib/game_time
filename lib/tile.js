var Tile = function (position) {
  this.x = position.x;
  this.y = position.y;
  this.width = 50;
  this.height = 50;
  this.sprite = 'sprites/grass-2.jpg';
};

Tile.prototype.centerX = function() {
  return this.x + (this.width / 2);
};

Tile.prototype.centerY = function() {
  return this.y + (this.height / 2);
};

module.exports = Tile;
