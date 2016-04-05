const SimpleTowerAnimation = require('./animations/simple-tower');
const lodash = require('lodash');

const Animation = function(shotEvent) {
  this.tower = shotEvent.tower;
  this.enemy = shotEvent.enemy;
  this.active = true;
  this.frameIndex = 0;
  this.createAnimationFrames(shotEvent.tower.type);
};

Animation.prototype.createAnimationFrames = function(type){
  let animation = getAnimation(type);
  this.frames = animation.frames;
  this.setImageSource(this.frames, animation.source);
};

function getAnimation(type) {
  switch (type) {
    case 'simpleTower':
      return new SimpleTowerAnimation();
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
    this.currentFrame = this.frames[this.frameIndex + 1];
    this.active = true;
  } else {
    this.active = false;
  }
};

module.exports = Animation;
