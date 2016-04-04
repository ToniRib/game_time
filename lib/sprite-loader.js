const Sprite = require('./sprite');

const SpriteLoader = function() {
  this.sprites = {
    quickEnemy: new Sprite('quickEnemy'),
    simpleEnemy: new Sprite('simpleEnemy')
  };
};

SpriteLoader.prototype.updateSprites = function() {
  for(var key in this.sprites) {
    this.sprites[key].getSpriteFrame();
  }
};

module.exports = SpriteLoader;
