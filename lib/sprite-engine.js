const Sprite = require('./sprite');

const SpriteEngine = {
  updateSprites(){
    for (var key in this.sprites) {
      this.sprites[key].setCurrentSpriteFrame();
    }
  },
  sprites: {
    quickEnemy: new Sprite('quickEnemy'),
    simpleEnemy: new Sprite('simpleEnemy'),
    monsterEnemy: new Sprite('monsterEnemy'),
    toastEnemy: new Sprite('toastEnemy'),
    simpleTower: new Sprite('simpleTower'),
    continuousFireTower: new Sprite('continuousFireTower'),
    heavyDamageTower: new Sprite('heavyDamageTower'),
    flashTower: new Sprite('flashTower')
  }
};

module.exports = SpriteEngine;
