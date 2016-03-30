var assert = require('chai').assert;
const Game = require('../lib/game');

describe('game initialization', function() {
  it('creates board from level options', function() {
    let game = new Game();
    let gameBoard = game.board;

    assert.typeOf(gameBoard, 'object');
    for (var i = 64; i < 80; i++) {
      assert.equal(gameBoard.tiles[i].constructor.name, 'PathTile');
    }
    assert.equal(gameBoard.tiles[51].constructor.name, 'BuildTile');
    assert.equal(gameBoard.tiles[89].constructor.name, 'BuildTile');
  });
});
