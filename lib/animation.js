const SimpleTowerAnimation = require('./animations/simple-tower');
const FlashTowerAnimation = require('./animations/flash-tower');
const ContinuousFireTowerAnimation = require('./animations/continuous-fire-tower');
const EnemyHitAnimation = require('./animations/enemy-hit');
const EnemyHitMediumAnimation = require('./animations/enemy-hit-medium');
const EnemyHitRainbowAnimation = require('./animations/enemy-hit-rainbow');

const lodash = require('lodash');

const Animation = function(shotEvent, nature) {
  this.tower = shotEvent.tower;
  this.enemy = shotEvent.enemy;
  this.active = true;
  this.frameIndex = 0;
  this.nature = nature;
  this.createAnimationFrames(shotEvent.tower.type);
};

Animation.prototype.createAnimationFrames = function(type){
  let animation = getAnimation(type, this.nature);
  this.frames = animation.frames;
  this.setImageSource(this.frames, animation.source);
};

function getAnimation(type, nature) {
  if (nature === 'fire'){
    switch (type) {
      case 'simpleTower':
        return new SimpleTowerAnimation();
      case 'flashTower':
        return new FlashTowerAnimation();
      case 'continuousFireTower':
        return new SimpleTowerAnimation();
      case 'heavyDamageTower':
        return new SimpleTowerAnimation();
    }
  } else if (nature === 'hit'){
    switch (type) {
      case 'simpleTower':
        return new EnemyHitRainbowAnimation();
      case 'flashTower':
        return new EnemyHitAnimation();
      case 'continuousFireTower':
        return new EnemyHitAnimation();
      case 'heavyDamageTower':
        return new EnemyHitMediumAnimation();
    }
  }
}

Animation.prototype.setImageSource = function(frames, imageLocation) {
  for (var i = 1; i <= lodash.size(frames); i++) {
    frames[i].src = `${imageLocation}${i}.png`;
  }
};

Animation.prototype.setCurrentAnimationFrame = function() {
  this.frameIndex += 1;
  if(this.frameIndex + 1 < Object.keys(this.frames).length){
    this.currentFrame = this.frames[(Math.round(this.frameIndex) %
                                     Object.keys(this.frames).length) + 1];
    this.active = true;
  } else {
    this.active = false;
  }
};

module.exports = Animation;
