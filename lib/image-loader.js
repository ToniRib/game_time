const ImageLoader = function() {
  this.images = {
    grassTile: new Image(),
    pathTile: new Image(),
    buildTile: new Image(),
    buildTileHighlighted: new Image(),
    simpleEnemy: new Image(),
    simpleTower: new Image(),
    flashTower: new Image(),
    buildSiteSelect: new Image()
  };
};

ImageLoader.prototype.init = function(level) {
  this.images.grassTile.src = grassSprites[level];
  this.images.pathTile.src = pathSprites[level];
  this.images.buildTile.src = 'sprites/build-site.jpg';
  this.images.buildTileHighlighted.src = 'sprites/build-site-highlight.jpg';
  this.images.simpleEnemy.src = 'sprites/orange.gif';
  this.images.simpleTower.src = 'sprites/super-tower-2.png';
  this.images.flashTower.src = 'sprites/whale-tower.gif';

  return this.images;
};

let pathSprites = {1: 'sprites/path.png',
                   2: 'sprites/path.png'
                  };

let grassSprites = {1: 'sprites/grass-2.jpg',
                    2: 'sprites/desert-tiles.png'};

module.exports = ImageLoader;
