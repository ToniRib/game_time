const Tile = require('./tile');

const PathTile = function(position, isTurnPoint, direction) {
  Tile.call(this, position);
  this.isTurnPoint = isTurnPoint || false;
  this.turnDirection = direction || null;
  this.rangeBuffer = 5;
  this.rangeBufferRef = 5;
  this.type = 'pathTile';
};

PathTile.prototype = Object.create(Tile.prototype);

PathTile.prototype.constructor = PathTile;

PathTile.prototype.enemiesInRange = function(enemies) {
  return enemies.filter(function(enemy) {
    return this.inRange(enemy);
  }.bind(this));
};

PathTile.prototype.inRange = function (enemy) {
  let dx = enemy.x - this.x;
  let dy = enemy.y - this.y;
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.rangeBuffer, 2);
};

module.exports = PathTile;
