var assert = require('chai').assert;
const Board = require('../lib/board.js');

describe('can build a board', function(){

  it('can build a board with default tiles', function (){
    let board = new Board({});
    assert.typeOf(board.tiles, 'array');
    assert.equal(board.tiles.length, 160);
    // Tile 0 is the beggining of the first row, 1 is second tile of the first row
    assert.equal(board.tiles[0].x, 0);
    assert.equal(board.tiles[1].x, 50);
    // Tile 15 is the end of the first row, 16 is the beginning of the second row
    assert.equal(board.tiles[15].x, 750);
    assert.equal(board.tiles[16].x, 0);
    assert.equal(board.tiles[0].y, 0);
    // Tile 16 is the beginning of the second row, 159 is the last tile of the board
    assert.equal(board.tiles[16].y, 50);
    assert.equal(board.tiles[159].y, 450);
  });

  it('can build a board with path tiles', function (){
    let board = new Board({15: {type: 'path', isTurn: true, direction: 'up'}, 32: {type:'path', isTurn: false}});
    assert.typeOf(board.tiles, 'array');
    assert.equal(board.tiles.length, 160);
    assert.equal(board.tiles[15].isTurnPoint, true);
    assert.equal(board.tiles[15].turnDirection, 'up');
    assert.equal(board.tiles[32].isTurnPoint, false);
  });

  it('can build a board with build tiles', function (){
    let board = new Board({15: {type: 'build'}, 32: {type:'build'}});
    assert.typeOf(board.tiles, 'array');
    assert.equal(board.tiles.length, 160);
    assert.equal(board.tiles[15].vacant, true);
    assert.equal(board.tiles[32].vacant, true);
  });

  it('can build a board with variety tiles', function (){
    let board = new Board({15: {type: 'path', isTurn: true, direction: 'up'}, 32: {type:'build'}});
    assert.typeOf(board.tiles, 'array');
    assert.equal(board.tiles.length, 160);
    assert.equal(board.tiles[15].isTurnPoint, true);
    assert.equal(board.tiles[15].turnDirection, 'up');
    assert.equal(board.tiles[32].vacant, true);
  });
});
