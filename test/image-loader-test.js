const ImageLoader = require('../lib/image-loader');
var assert = require('chai').assert;

describe('loads images by level', function(){
  it('loads pathTile by level', function(){
    let imageLoader = new ImageLoader();
    let images1 = imageLoader.init(1);
    let images2 = imageLoader.init(2);

    assert.equal(images1.pathTile.src, 'http://localhost:8080/sprites/path.png');
    assert.equal(images2.pathTile.src, 'http://localhost:8080/sprites/path.png');
  });

  it('loads grassTile by level', function(){
    let imageLoader = new ImageLoader();
    let images1 = imageLoader.init(1);
    imageLoader = new ImageLoader();
    let images2 = imageLoader.init(2);

    assert.equal(images1.grassTile.src, 'http://localhost:8080/sprites/pixel-grass.jpg');
    assert.equal(images2.grassTile.src, 'http://localhost:8080/sprites/desert-tiles.png');
  });
});
