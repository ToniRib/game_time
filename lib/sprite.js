var lodash = require('lodash');
const SimpleEnemySprite = require('./sprites/simple-enemy');
const QuickEnemySprite = require('./sprites/quick-enemy');
const MonsterEnemySprite = require('./sprites/monster-enemy');
const ToastEnemySprite = require('./sprites/toast-enemy');

const Sprite = function(type) {
  this.frameIndex = 1;
  this.createSpriteFrames(type);
  this.currentFrame = this.frames[1];
};

Sprite.prototype.createSpriteFrames = function(type){
  let sprite = getSprite(type);
  this.frames = sprite.frames;
  this.setImageSource(this.frames, sprite.source);
};

function getSprite(type) {
  switch (type) {
    case 'quickEnemy':
      return new QuickEnemySprite();
    case 'simpleEnemy':
      return new SimpleEnemySprite();
    case 'monsterEnemy':
      return new MonsterEnemySprite();
    case 'toastEnemy':
      return new ToastEnemySprite();
  }
}

Sprite.prototype.setImageSource = function(frames, imageLocation) {
  for (var i = 1; i <= lodash.size(frames); i++) {
    frames[i].src = `${imageLocation}${i}.png`;
  }
};

Sprite.prototype.setCurrentSpriteFrame = function() {
  this.frameIndex += 1;
  //1. divides framerate by 3 and rounds to slow animation.
  //2. modulos by number of frames so that animation loops.
  //3. adds 1 frame so that 0 called on keys is not undefined.
  this.currentFrame = this.frames[(Math.round(this.frameIndex / 3) %
                                   Object.keys(this.frames).length) + 1];
};

module.exports = Sprite;
