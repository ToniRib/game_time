const Tile = require('./tile');

const PathTile = function(position, isTurnPoint, direction) {
  Tile.call(this, position);
  this.isTurnPoint = isTurnPoint || false;
  this.turnDirection = direction || null;
};

PathTile.prototype = Object.create(Tile.prototype);

PathTile.prototype.constructor = PathTile;

module.exports = PathTile;
