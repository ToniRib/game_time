const Tile = require('./tile');

const PathTile = function(position, isTurnPoint, direction) {
  Tile.call(this, position);
  this.isTurnPoint = isTurnPoint || false;
  this.turnDirection = direction || null;
  this.type = 'pathTile';
  this.sprite = 'sprites/path.png';
};

PathTile.prototype = Object.create(Tile.prototype);

PathTile.prototype.constructor = PathTile;

module.exports = PathTile;
