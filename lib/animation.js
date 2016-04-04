const SimpleEnemyAnimation = require('./animations/simple-enemy');

const Animation = function(shotEvent) {
  this.tower = shotEvent.tower;
  this.enemy = shotEvent.enemy;
  createAnimationFrames(shotEvent.type);
};

Animation.prototype.createAnimationFrames = function(type){
  let animation = getAnimation(type);
  this.frames = animation.frames;
  this.setImageSource(this.frames, animation.source);
};

function getAnimation(type) {
  switch (type) {
    case 'simpleEnemy':
      return new SimpleEnemyAnimation();
  }
}

Animation.prototype.setImageSource = function(frames, imageLocation) {
  for (var i = 1; i <= lodash.size(frames); i++) {
    frames[i].src = `${imageLocation}${i}.png`;
  }
};

Animation.prototype.setCurrentAnimationFrame = function() {
  this.frameIndex += 1;
  //1. divides framerate by 3 and rounds to slow animation.
  //2. modulos by number of frames so that animation loops.
  //3. adds 1 frame so that 0 called on keys is not undefined.
  this.currentFrame = this.frames[(Math.round(this.frameIndex / 3) %
                                   Object.keys(this.frames).length) + 1];
};

module.exports = Animation;
