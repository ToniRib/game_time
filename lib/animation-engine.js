const Animation = require('./animation');

const AnimationEngine = {
  animations: [],
  updateAnimations() {
    this.animations.forEach(animation =>  animation.setCurrentAnimationFrame());
    this.animations = this.animations.filter(animation => animation.active);
  },
  triggerAnimation(shotEvent) {
    this.animations.push(new Animation(shotEvent, 'fire'));
    this.animations.push(new Animation(shotEvent, 'hit'));
  }
};

module.exports = AnimationEngine;
