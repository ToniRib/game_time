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

  it('creates enemies when instantiated', function() {
    let game = new Game();
    let gameEnemies = game.enemies;

    assert.equal(gameEnemies[0].constructor.name, 'SimpleEnemy');
    assert.equal(gameEnemies.length, 3);
  });

  //
  // it('finds turn tiles from board', function() {
  //   let game = new Game();
  //   let gameBoard = game.board;
  //
  //   assert.equal(gameBoard.tiles[51].constructor.name, 'BuildTile');
  //   assert.equal(gameBoard.tiles[89].constructor.name, 'BuildTile');
  // });
});

describe('enemy logic', function(){
  it('returns all alive enemies', function(){
    let game = new Game();
    let initialEnemiesCount = game.enemies.length;
    game.enemies[0].alive = false;
    let gameEnemies = game.retrieveAliveEnemies();

    assert.equal(gameEnemies.length, initialEnemiesCount - 1);
  });

  it('returns enemies on board', function(){
    let game = new Game();
    game.enemies[0].x = 100;
    let gameEnemies = game.retrieveAliveEnemiesOnBoard();

    assert.equal(gameEnemies.length, 1);
  });

  it('removes enemies who go off right side of board', function() {
    let game = new Game();
    let initialEnemiesCount = game.enemies.length;

    game.enemies[0].x = 801;
    game.removeEnemiesOffRight();

    assert.equal(game.enemies.length, initialEnemiesCount - 1);
  });

  it('decreases lives by one if enemy goes off right side of board', function() {
    let game = new Game();
    let initialLives = game.lives;

    game.enemies[0].x = 801;
    game.removeEnemiesOffRight();

    assert.equal(game.lives, initialLives - 1);
  });
});

describe('tower logic', function(){
  it('returns all tiles with towers', function(){
    let game = new Game();
    game.board.tiles[51].addTower('simple');
    let towerTiles = game.getTowerTiles();

    assert.equal(towerTiles.length, 1);
    assert.equal(towerTiles[0].constructor.name, 'BuildTile');
  });

  it('returns all towers active in game', function(){
    let game = new Game();
    game.board.tiles[51].addTower('simple');
    let towers = game.getTowers();

    assert.equal(towers.length, 1);
    assert.equal(towers[0].constructor.name, 'SimpleTower');
  });
});

describe('game outcome logic', function(){
  it('game can be won', function(){
    let game = new Game();
    game.enemies = [];

    assert.equal(game.checkStatus(), 'win');
  });

  it('game can be lost', function(){
    let game = new Game();
    game.lives = 0;

    assert.equal(game.checkStatus(), 'lose');
  });

  it('game continues', function(){
    let game = new Game();
    game.lives = 1;

    assert.equal(game.checkStatus(), 'ongoing');
  });
});
