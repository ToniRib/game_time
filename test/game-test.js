var assert = require('chai').assert;
const game = require('../lib/game.js');

it('game is a function', function (){
  assert.typeOf(game, 'function');
});
