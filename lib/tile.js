var Tile = function (position) {
  this.x = position.x;
  this.y = position.y;
  this.width = 50;
  this.height = 50;
  this.type = 'grassTile';
};

Tile.prototype.centerX = function() {
  return this.x + (this.width / 2);
};

Tile.prototype.centerY = function() {
  return this.y + (this.height / 2);
};

Tile.prototype.isPathTile = function() {
  return this.type === 'pathTile';
};

Tile.prototype.isBuildTile = function() {
  return this.type === 'buildTile';
};

Tile.prototype.isHighlightedBuildTile = function() {
  return this.type === 'buildTileHighlighted';
};

Tile.prototype.isSelectedBuildTile = function() {
  return this.type === 'buildTileSelected';
};

module.exports = Tile;
