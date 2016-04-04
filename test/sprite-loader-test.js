var assert = require('chai').assert;
const SpriteLoader = require('../lib/sprite-loader');

describe('it loads sprites', function(){
  it('loads enemies', function(){
      let spriteLoader = new SpriteLoader();

      assert.equal(spriteLoader.sprites['quickEnemy'].constructor.name, 'Sprite');
      assert.equal(Object.keys(spriteLoader.sprites['quickEnemy'].frames).length, 8);
      assert.equal(Object.keys(spriteLoader.sprites['simpleEnemy'].frames).length, 9);
  });

  it('gets next frames', function(){
      let spriteLoader = new SpriteLoader();
      spriteLoader.updateSprites();

      assert.equal( spriteLoader.sprites['quickEnemy'].frameIndex, 2);
      assert.equal( spriteLoader.sprites['simpleEnemy'].frameIndex, 2);
  });

});
