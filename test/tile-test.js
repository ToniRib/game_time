var assert = require('chai').assert;
const Tile = require('../lib/tile.js');

it('game is a function', function (){
  assert.typeOf(Tile, 'function');
});
