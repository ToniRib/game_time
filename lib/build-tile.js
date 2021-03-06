const Tile = require('./tile');

const BuildTile = function(position) {
  Tile.call(this, position);
  this.vacant = true;
  this.type = 'buildTile';
};

BuildTile.prototype = Object.create(Tile.prototype);

BuildTile.prototype.constructor = BuildTile;

BuildTile.prototype.addTower = function(tower) {
  if (this.vacant) {
    this.tower = tower;
    this.vacant = false;
  }
};

BuildTile.prototype.removeTower = function() {
  if (!this.vacant) {
    this.tower = null;
    this.vacant = true;
  }
};

BuildTile.prototype.hasTower = function() {
  return !this.vacant;
};

module.exports = BuildTile;
