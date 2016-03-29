const SimpleTower = require('./simple-tower');

var Tile = function (type, position) {
  this.buildSite = type.isBuildSite || false ;
  this.pathSite = type.isPathSite || false ;
  this.vacant = true;
  this.x = position.x;
  this.y = position.y;
  this.width = 50;
  this.height = 50;
};

Tile.prototype.addTower = function(type) {
  if (this.buildSite && this.vacant) {
    if (type === 'simple') {
      this.tower = new SimpleTower({x: this.x + (this.width / 2), y: this.y + (this.height / 2)});
      this.vacant = false;
    }
  }
};


module.exports = Tile;
