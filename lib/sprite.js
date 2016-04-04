var lodash = require('lodash');

const Sprite = function(type){
  this.frame = 1;
  this.createSpriteFrames(type);
  this.currentFrame = this.frames[1];
};

Sprite.prototype.createSpriteFrames = function(type){
  if (type === 'quickEnemy') {
    this.frames =  {1: new Image(),
                    2: new Image(),
                    3: new Image(),
                    4: new Image(),
                    5: new Image(),
                    6: new Image(),
                    7: new Image(),
                    8: new Image()};
    for(var i = 1; i <= lodash.size(this.frames); i++){
      this.frames[i].src = 'sprites/pizza-frames/pizza' + i + '.png';
    }
  } else if (type === 'simpleEnemy') {
      this.frames =  {1: new Image(),
                      2: new Image(),
                      3: new Image(),
                      4: new Image(),
                      5: new Image(),
                      6: new Image(),
                      7: new Image(),
                      8: new Image(),
                      9: new Image()};
    for(var f = 1; f <= lodash.size(this.frames); f++){
      this.frames[f].src = 'sprites/burger-frames/burger' + f + '.png';
    }
  }
};

Sprite.prototype.getSpriteFrame = function(){
  this.frame += 1;
  this.currentFrame = this.frames[(Math.round(this.frame/3) % Object.keys(this.frames).length) + 1];
};

module.exports = Sprite;
