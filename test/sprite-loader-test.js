var assert = require('chai').assert;
const SpriteLoader = require('../lib/sprite-engine');

describe('it loads sprites', function(){
  it('loads enemies', function(){

      assert.equal(SpriteLoader.sprites['quickEnemy'].constructor.name, 'Sprite');
      assert.equal(Object.keys(SpriteLoader.sprites['quickEnemy'].frames).length, 8);
      assert.equal(Object.keys(SpriteLoader.sprites['simpleEnemy'].frames).length, 9);
  });

  it('gets next frames', function(){
      SpriteLoader.updateSprites();

      assert.equal( SpriteLoader.sprites['quickEnemy'].frameIndex, 2);
      assert.equal( SpriteLoader.sprites['simpleEnemy'].frameIndex, 2);
  });

});
