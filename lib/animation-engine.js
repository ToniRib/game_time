const Animation = require('./animation');

const AnimationEngine = function() {
  this.animations = [];
};

AnimationEngine.prototype.triggerAnimation = function(shotEvent) {
  this.animations.push(new Animation(shotEvent));
};

AnimationEngine.prototype.updateAnimations = function() {
  this.animations.forEach(function(animation){
                          animation.setCurrentAnimationFrame();
                        });
  this.animations = this.animations.filter(function(animation){
                      return animation.active;
                    });
};

module.exports = AnimationEngine;