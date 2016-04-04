var assert = require('chai').assert;
const Sprite = require('../lib/sprite');

describe('sprites load', function(){
  it('loads quick enemy', function(){
      let sprite = new Sprite('quickEnemy');

      assert.equal(Object.keys(sprite.frames).length, 8);
      assert.equal(sprite.currentFrame.src, 'http://localhost:8080/sprites/pizza-frames/pizza1.png');
  });

  it('gets next frame', function(){
    let sprite = new Sprite('quickEnemy');

    assert.equal(sprite.currentFrame.src, 'http://localhost:8080/sprites/pizza-frames/pizza1.png');

    sprite.setCurrentSpriteFrame();

    assert.equal(sprite.currentFrame.src, 'http://localhost:8080/sprites/pizza-frames/pizza2.png');
  });

  it('loops back to original frame', function(){
    let sprite = new Sprite('quickEnemy');
    assert.equal(sprite.currentFrame.src, 'http://localhost:8080/sprites/pizza-frames/pizza1.png');

    for(var i = 0; i < 23; i++){
      sprite.setCurrentSpriteFrame();
    }

    assert.equal(sprite.currentFrame.src, 'http://localhost:8080/sprites/pizza-frames/pizza1.png');
  });
});
