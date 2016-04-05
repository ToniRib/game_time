const Sprite = require('./sprite');

const SpriteLoader = function() {
  this.sprites = {
    quickEnemy: new Sprite('quickEnemy'),
    simpleEnemy: new Sprite('simpleEnemy'),
    monsterEnemy: new Sprite('monsterEnemy'),
    toastEnemy: new Sprite('toastEnemy'),
    simpleTower: new Sprite('simpleTower'),
    continuousFireTower: new Sprite('continuousFireTower'),
    heavyDamageTower: new Sprite('heavyDamageTower'),
    flashTower: new Sprite('flashTower')
  };
};

SpriteLoader.prototype.updateSprites = function() {
  for (var key in this.sprites) {
    this.sprites[key].setCurrentSpriteFrame();
  }
};

module.exports = SpriteLoader;
