var lodash = require('lodash');
const SimpleEnemySprite = require('./sprites/simple-enemy');
const QuickEnemySprite = require('./sprites/quick-enemy');

const Sprite = function(type) {
  this.frame = 1;
  this.createSpriteFrames(type);
  this.currentFrame = this.frames[1];
};

Sprite.prototype.createSpriteFrames = function(type){
  if (type === 'quickEnemy') {
    let quickEnemySprite = new QuickEnemySprite();
    this.frames = quickEnemySprite.frames;
    this.setImageSource(this.frames, quickEnemySprite.source);
  } else if (type === 'simpleEnemy') {
    let simpleEnemySprite = new SimpleEnemySprite();
    this.frames = simpleEnemySprite.frames;
    this.setImageSource(this.frames, simpleEnemySprite.source);
  }
};

Sprite.prototype.setImageSource = function(frames, imageLocation) {
  for (var i = 1; i <= lodash.size(frames); i++) {
    frames[i].src = imageLocation + i + '.png';
  }
};

Sprite.prototype.getSpriteFrame = function() {
  this.frame += 1;
  //1. divides framerate by 3 and rounds to slow animation.
  //2. modulos by number of frames so that animation loops.
  //3. adds 1 frame so that 0 called on keys is not undefined.
  this.currentFrame = this.frames[(Math.round(this.frame / 3) %
                                   Object.keys(this.frames)
                                   .length) + 1];
};

module.exports = Sprite;
