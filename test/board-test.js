var assert = require('chai').assert;
const Board = require('../lib/board');
const SimpleTower = require('../lib/simple-tower');

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

describe('board is clicked on', function() {
  it('returns the tile that was clicked', function() {
    let board = new Board({});
    let clickedTile = board.getClickedTile(25, 25);
    let firstTile = board.tiles[0];

    assert.equal(firstTile, clickedTile);
  });

  it('returns the correct tile for left edge case', function() {
    let board = new Board({});
    let clickedTile = board.getClickedTile(50, 25);
    let secondTile = board.tiles[1];

    assert.equal(secondTile, clickedTile);
  });

  it('returns the correct tile for just left of left edge case', function() {
    let board = new Board({});
    let clickedTile = board.getClickedTile(49, 25);
    let firstTile = board.tiles[0];

    assert.equal(firstTile, clickedTile);
  });

  it('returns the correct tile for lower edge case', function() {
    let board = new Board({});
    let clickedTile = board.getClickedTile(25, 50);
    let secondTile = board.tiles[16];

    assert.equal(secondTile, clickedTile);
  });

  it('returns the correct tile for just above of lower edge case', function() {
    let board = new Board({});
    let clickedTile = board.getClickedTile(25, 49);
    let firstTile = board.tiles[0];

    assert.equal(firstTile, clickedTile);
  });
});

describe('board has knowledge of turn tiles', function() {
  it('returns a list of path tiles that are turn points', function() {
    let board = new Board({15: {type: 'path', isTurn: true, direction: 'up'}, 32: {type:'path', isTurn: true, direction: 'right'}});

    let turnTiles = board.getTurnTiles();

    assert.equal(turnTiles.length, 2);
  });
});

describe('board has knowledge of tiles with towers', function() {
  it('returns a list of build tiles with towers', function() {
    let board = new Board({ 15: {type: 'build'}, 32: {type:'build'} });
    let buildTile = board.tiles[15];
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });
    buildTile.addTower(simpleTower);

    let tilesWithTowers = board.getTilesWithTowers();

    assert.equal(tilesWithTowers.length, 1);
  });

  it('can remove all towers', function() {
    let board = new Board({ 15: {type: 'build'}, 32: {type:'build'} });
    let buildTile = board.tiles[15];
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });
    buildTile.addTower(simpleTower);

    board.removeAllTowers();

    let tilesWithTowers = board.getTilesWithTowers();

    assert.equal(tilesWithTowers.length, 0);
  });
});

describe('board keeps track of clicked tiles', function() {
  it('can set a current tile', function() {
    let board = new Board({});
    board.setCurrentTile(25, 25);

    assert.equal(board.currentTile, board.tiles[0]);
  });

  it('keeps track of last tile', function() {
    let board = new Board({});
    board.setCurrentTile(25, 25);
    board.setCurrentTile(75, 25);

    assert.equal(board.currentTile, board.tiles[1]);
    assert.equal(board.lastTile, board.tiles[0]);
  });

  it('can determine if current tile is a vacant build tile', function() {
    let board = new Board({ 0: {type: 'build'} });
    board.setCurrentTile(25, 25);

    assert(board.currentTileIsAVacantBuildTile());
  });
});
