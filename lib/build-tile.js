const SimpleTower = require('./simple-tower');
const Tile = require('./tile');

var BuildTile = function(position) {
  Tile.call(this, position);
  this.vacant = true;
};

BuildTile.prototype = Object.create(Tile.prototype);

BuildTile.prototype.constructor = BuildTile;

BuildTile.prototype.addTower = function(type) {
  if (this.vacant) {
    if (type === 'simple') {
      this.tower = new SimpleTower({x: this.x + (this.width / 2), y: this.y + (this.height / 2)});
      this.vacant = false;
    }
  }
};

module.exports = BuildTile;
