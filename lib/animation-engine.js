const Animation= require('./animation');

const AnimationEngine = function() {
  this.animations = [];
};

AnimationEngine.prototype.triggerAnimation = function(shotEvent) {
  this.animations.push(new Animation(shotEvent));
};

module.exports = AnimationEngine;
