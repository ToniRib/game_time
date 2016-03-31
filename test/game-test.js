var assert = require('chai').assert;
const Game = require('../lib/game');
const Level = require('../lib/levels/level');
const Board = require('../lib/board');

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
});

describe('game enemy logic', function(){
  it('returns all alive enemies', function(){
    let game = new Game();
    let initialEnemiesCount = game.enemies.length;
    game.enemies[0].alive = false;
    let gameEnemies = game.retrieveAliveEnemies();

    assert.equal(gameEnemies.length, initialEnemiesCount - 1);
  });

  it('returns enemies on board', function(){
    let game = new Game();
    game.enemies[2].x = 100;
    console.log(game.enemies)
    let gameEnemies = game.retrieveAliveEnemiesOnBoard();

    assert.equal(gameEnemies.length, 1);
  });

  it('removes enemies who go off right side of board', function() {
    let game = new Game();
    let initialEnemiesCount = game.enemies.length;

    game.enemies[0].x = 801;
    game.removeEnemiesOffRight();
    game.retrieveAliveEnemies();

    assert.equal(game.enemies.length, initialEnemiesCount - 1);
  });

  it('decreases lives by one if enemy goes off right side of board', function() {
    let game = new Game();
    let initialLives = game.lives;

    game.enemies[0].x = 801;
    game.removeEnemiesOffRight();

    assert.equal(game.lives, initialLives - 1);
  });

  it('gains money for each dead enemy', function() {
    let game = new Game();

    assert.equal(game.monies, 100);
    assert.equal(game.enemies[0].price, 20);

    game.enemies[0].alive = false;
    game.retrieveAliveEnemies();
    game.rewardMonies();

    assert.equal(game.monies, 120);

    game.enemies[1].alive = false;
    game.retrieveAliveEnemies();
    game.rewardMonies();

    assert.equal(game.monies, 140);
  });

  it('does not gain money for an enemy who makes it off the board', function() {
    let game = new Game();
    game.board = new Board(boardOne);

    assert.equal(game.monies, 100);

    game.enemies[0].x = 900;
    game.removeEnemiesOffRight();
    game.rewardMonies();
    game.retrieveAliveEnemies();

    assert.equal(game.monies, 100);
  });
});

describe('game tower logic', function(){
  it('returns all tiles with towers', function(){
    let game = new Game();
    game.board = new Board(boardOne);

    game.board.tiles[51].addTower('simple');
    let towerTiles = game.getTowerTiles();

    assert.equal(towerTiles.length, 1);
    assert.equal(towerTiles[0].constructor.name, 'BuildTile');
  });

  it('returns all towers active in game', function(){
    let game = new Game();
    game.board = new Board(boardOne);
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

describe('game turn logic', function(){

  it('enemy changes direction at turn tile', function(){
    let game = new Game();
    game.board = new Board(boardTwo);

    let downTurnTile = game.board.getTurnTiles()[1];
    let enemyOneCurrentDirection = game.enemies[0].currentDirection;
    game.enemies[0].x = downTurnTile.x;
    game.enemies[0].y = downTurnTile.y;

    game.redirectEnemies();

    let enemyOneNewDirection = game.enemies[0].currentDirection;

    assert.notEqual(enemyOneCurrentDirection, enemyOneNewDirection);
  });

  it('enemy is recentered at turn tile', function(){
    let game = new Game();
    game.board = new Board(boardTwo);

    let downTurnTile = game.board.getTurnTiles()[1];
    game.enemies[0].x = downTurnTile.x + 3;
    game.enemies[0].y = downTurnTile.y - 2;

    game.redirectEnemies();

    assert.equal(downTurnTile.x, game.enemies[0].x);
    assert.equal(downTurnTile.y, game.enemies[0].y);
  });

});
