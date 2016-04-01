const ImageLoader = function() {
  this.images = {
    grassTile: new Image(),
    pathTile: new Image(),
    buildTile: new Image(),
    buildTileHighlighted: new Image(),
    simpleEnemy: new Image(),
    quickEnemy: new Image(),
    simpleTower: new Image(),
    flashTower: new Image(),
    buildSiteSelect: new Image()
  };
};

ImageLoader.prototype.init = function() {
  this.images.grassTile.src = 'sprites/grass-2.jpg';
  this.images.pathTile.src = 'sprites/path.png';
  this.images.buildTile.src = 'sprites/build-site.jpg';
  this.images.buildTileHighlighted.src = 'sprites/build-site-highlight.jpg';
  this.images.simpleEnemy.src = 'sprites/orange.gif';
  this.images.quickEnemy.src = 'sprites/pizza.gif';
  this.images.simpleTower.src = 'sprites/super-tower-2.png';
  this.images.flashTower.src = 'sprites/whale-tower.gif';

  return this.images;
};

module.exports = ImageLoader;
