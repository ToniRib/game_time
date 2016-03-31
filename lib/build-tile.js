const SimpleTower = require('./simple-tower');
const FlashTower = require('./flash-tower');
const Tile = require('./tile');

const BuildTile = function(position) {
  Tile.call(this, position);
  this.vacant = true;
  this.type = 'buildTile';
};

BuildTile.prototype = Object.create(Tile.prototype);

BuildTile.prototype.constructor = BuildTile;

BuildTile.prototype.addTower = function(type) {
  if (this.vacant) {
    if (type === 'simple') {
      this.tower = new SimpleTower({x: this.centerX(), y: this.centerY()});
      this.vacant = false;
    } else if (type === 'flash') {
      this.tower = new FlashTower({x: this.centerX(), y: this.centerY()});
      this.vacant = false;
    }
  }
};

module.exports = BuildTile;
