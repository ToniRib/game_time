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

module.exports = BuildTile;
