const ImageLoader = function() {
  this.images = {
    grassTile: new Image(),
    pathTile: new Image(),
    buildTile: new Image(),
    buildTileHighlighted: new Image(),
    buildTileSelected: new Image(),
    simpleEnemy: new Image(),
    simpleTower: new Image(),
    flashTower: new Image(),
    heavyDamageTower: new Image(),
    continuousFireTower: new Image(),
    buildSiteSelect: new Image()
  };
};

let pathSprites = {
  1: 'sprites/dirt-tile.png',
  2: 'sprites/path.png',
  3: 'sprites/dirt-tile.png',
  4: 'sprites/metal-tile.png',
  5: 'sprites/metal-tile.png'
};

let grassSprites = {
  1: 'sprites/pixel-grass.jpg',
  2: 'sprites/flower-tile.png',
  3: 'sprites/desert-tiles.png',
  4: 'sprites/space-tile.jpg',
  5: 'sprites/lava-tile.png'
};

ImageLoader.prototype.init = function(level) {
  this.images.grassTile.src = grassSprites[level];
  this.images.pathTile.src = pathSprites[level];
  this.images.buildTile.src = 'sprites/red-brick.png';
  this.images.buildTileHighlighted.src = 'sprites/red-brick-highlight.png';
  this.images.buildTileSelected.src = 'sprites/red-brick-selected.png';
  this.images.simpleEnemy.src = 'sprites/orange.gif';
  this.images.simpleTower.src = 'sprites/super-tower-2.png';
  this.images.flashTower.src = 'sprites/whale-tower.gif';
  this.images.heavyDamageTower.src = 'sprites/panda.gif';
  this.images.continuousFireTower.src = 'sprites/bunny.gif';

  return this.images;
};

module.exports = ImageLoader;
