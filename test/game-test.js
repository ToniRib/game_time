var assert = require('chai').assert;
const Game = require('../lib/game');
const SimpleTower = require('../lib/simple-tower');

describe('game initialization', function() {
  it('creates board from level options', function() {
    let game = new Game();
    game.updateLevel('test', 1);
    let gameBoard = game.board;

    assert.typeOf(gameBoard, 'object');
    assert.equal(gameBoard.tiles[98].constructor.name, 'PathTile');
    assert.equal(gameBoard.tiles[82].constructor.name, 'BuildTile');
    assert.equal(gameBoard.tiles[7].constructor.name, 'Tile');
  });

  it('creates enemies when instantiated', function() {
    let game = new Game();
    game.updateLevel('test', 1);
    let gameEnemies = game.enemies;

    assert.equal(gameEnemies[0].constructor.name, 'SimpleEnemy');
    assert.equal(gameEnemies.length, 6);
  });
});

describe('game enemy logic', function(){
  it('returns all alive enemies', function(){
    let game = new Game();
    game.updateLevel('test', 1);
    let initialEnemiesCount = game.enemies.length;
    game.enemies[0].alive = false;
    let gameEnemies = game.retrieveAliveEnemies();

    assert.equal(gameEnemies.length, initialEnemiesCount - 1);
  });

  it('returns enemies on board', function(){
    let game = new Game();
    game.updateLevel('test', 1);
    game.enemies[2].x = 100;
    let gameEnemies = game.retrieveAliveEnemiesOnBoard();

    assert.equal(gameEnemies.length, 1);
  });

  it('removes enemies who go off right side of board', function() {
    let game = new Game();
    game.updateLevel('test', 1);
    let initialEnemiesCount = game.enemies.length;

    game.enemies[0].x = 801;
    game.removeEnemiesOffRight();
    game.retrieveAliveEnemies();

    assert.equal(game.enemies.length, initialEnemiesCount - 1);
  });

  it('decreases lives by one if enemy goes off right side of board', function() {
    let game = new Game();
    game.updateLevel('test', 1);
    let initialLives = game.lives;

    game.enemies[0].x = 801;
    game.removeEnemiesOffRight();

    assert.equal(game.lives, initialLives - 1);
  });

  it('gains money for each dead enemy', function() {
    let game = new Game();
    game.updateLevel('test', 1);

    assert.equal(game.monies, 100);
    assert.equal(game.enemies[0].price, 20);

    game.enemies[0].active = true;
    game.enemies[0].alive = false;
    game.retrieveAliveEnemies();
    game.rewardMonies();

    assert.equal(game.monies, 120);

    game.enemies[0].active = true;
    game.enemies[1].alive = false;
    game.retrieveAliveEnemies();
    game.rewardMonies();

    assert.equal(game.monies, 140);
  });

  it('does not gain money for an enemy who makes it off the board', function() {
    let game = new Game();
    game.updateLevel('test', 1);

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
    game.updateLevel('test', 1);
    let simpleTower = new SimpleTower({ x: game.board.tiles[82].centerX, y: game.board.tiles[82].centerY });
    game.board.tiles[82].addTower(simpleTower);
    let towerTiles = game.getTowerTiles();

    assert.equal(towerTiles.length, 1);
    assert.equal(towerTiles[0].constructor.name, 'BuildTile');
  });

  it('returns all towers active in game', function(){
    let game = new Game();
    game.updateLevel('test', 1);

    let buildTile = game.board.tiles[82];
    let simpleTower = new SimpleTower({ x: buildTile.centerX(), y: buildTile.centerY() });

    buildTile.addTower(simpleTower);
    let towers = game.getTowers();

    assert.equal(towers.length, 1);
  });

  it('returns true if it can afford a tower', function() {
    let game = new Game();
    game.updateLevel('test', 1);
    game.monies = 100;

    assert(game.canAffordTower(70));
  });

  it('returns false if it cannot afford a tower', function() {
    let game = new Game();
    game.updateLevel('test', 1);
    game.monies = 100;

    assert.equal(game.canAffordTower(150), false);
  });
});

describe('game outcome logic', function(){
  it('game can be won', function(){
    let game = new Game();
    game.updateLevel('test', 1);
    game.enemies = [];

    assert.equal(game.checkStatus(), 'win');
  });

  it('game can be lost', function(){
    let game = new Game();
    game.updateLevel('test', 1);
    game.lives = 0;

    assert.equal(game.checkStatus(), 'lose');
  });

  it('game continues', function(){
    let game = new Game();
    game.updateLevel('test', 1);
    game.lives = 1;

    assert.equal(game.checkStatus(), 'ongoing');
  });
});

describe('game turn logic', function(){
  it('enemy changes direction at turn tile', function(){
    let game = new Game();
    game.updateLevel('test', 1);

    let downTurnTile = game.board.getTurnTiles()[1];
    let enemyOneCurrentDirection = game.enemies[0].currentDirection;
    game.enemies[0].x = downTurnTile.x;
    game.enemies[0].y = downTurnTile.y;

    game.redirectEnemies();

    let enemyOneNewDirection = game.enemies[0].currentDirection;

    assert.notEqual(enemyOneCurrentDirection, enemyOneNewDirection);
  });
});

describe('game level logic', function() {
  it('starts at level one, difficulty one', function() {
    let game = new Game();

    assert.equal(game.currentLevel.stage, 1);
    assert.equal(game.currentLevel.difficulty, 1);
  });

  it('can update the current level of the game', function() {
    let game = new Game();
    game.updateLevel(2, 2);

    assert.equal(game.currentLevel.stage, 2);
    assert.equal(game.currentLevel.difficulty, 2);
  });

  it('can load the next level', function() {
    let game = new Game();
    game.updateLevel(1, 2);
    game.loadNextLevel();

    assert.equal(game.currentLevel.stage, 2);
    assert.equal(game.currentLevel.difficulty, 1);
  });

  it('can load the next difficulty', function() {
    let game = new Game();
    game.updateLevel(2, 2);
    game.loadNextDifficulty();

    assert.equal(game.currentLevel.stage, 2);
    assert.equal(game.currentLevel.difficulty, 3);
  });

  it('will load the next level if on the last difficulty', function() {
    let game = new Game();
    game.updateLevel(1, 3);
    game.loadNextDifficulty();

    assert.equal(game.currentLevel.stage, 2);
    assert.equal(game.currentLevel.difficulty, 1);
  });
});

describe('game winning stars logic', function() {
  it('returns 3 stars if user has lost 0 lives on difficulty 1', function() {
    let game = new Game();
    game.currentLevel.difficulty = 1;
    game.lives = 5;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 3);
  });

  it('returns 3 stars if user has lost 0 lives on difficulty 2', function() {
    let game = new Game();
    game.currentLevel.difficulty = 2;
    game.lives = 3;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 3);
  });

  it('returns 3 stars if user has lost 0 lives on difficulty 3', function() {
    let game = new Game();
    game.currentLevel.difficulty = 3;
    game.lives = 1;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 3);
  });

  it('returns 2 stars if user has lost 1 life on difficulty 1', function() {
    let game = new Game();
    game.currentLevel.difficulty = 1;
    game.lives = 4;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 2);
  });

  it('returns 2 stars if user has lost 1 life on difficulty 2', function() {
    let game = new Game();
    game.currentLevel.difficulty = 2;
    game.lives = 2;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 2);
  });

  it('returns 1 star if user has lost 2 lives on difficulty 1', function() {
    let game = new Game();
    game.currentLevel.difficulty = 1;
    game.lives = 3;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 1);
  });

  it('returns 1 star if user has lost 2 lives on difficulty 2', function() {
    let game = new Game();
    game.currentLevel.difficulty = 2;
    game.lives = 1;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 1);
  });

  it('returns 1 star if user has lost 3 lives on difficulty 1', function() {
    let game = new Game();
    game.currentLevel.difficulty = 1;
    game.lives = 2;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 1);
  });

  it('returns 1 star if user has lost 4 lives on difficulty 1', function() {
    let game = new Game();
    game.currentLevel.difficulty = 1;
    game.lives = 1;

    let stars = game.determineNumberOfStars();

    assert.equal(stars, 1);
  });
});

describe("fast foward functionality", function(){
  it('adjusts values when fast foward is clicked', function(){
    let game = new Game();
    game.updateLevel('test', 1);
    let simpleTower = new SimpleTower({ x: game.board.tiles[22].centerX, y: game.board.tiles[22].centerY });
    let enemySpeed = game.enemies[0].speed;
    let tile = game.board.getTurnTiles()[0];
    let tileBufferRange = tile.rangeBuffer;
    game.board.tiles[22].addTower(simpleTower);
    game.fastFoward();

    assert.equal(simpleTower.fireRate, (simpleTower.fireRateRef / 2));
    assert.equal(game.enemies[0].speed, (enemySpeed * 2));
    assert.equal(tile.rangeBuffer, (tileBufferRange * 2));
  });

  it('adjusts values back to original', function(){
    let game = new Game();
    game.updateLevel('test', 1);
    let simpleTower = new SimpleTower({ x: game.board.tiles[127].centerX, y: game.board.tiles[127].centerY });
    game.board.tiles[127].addTower(simpleTower);
    game.fastFoward();
    let enemySpeed = game.enemies[2].speed;
    let towerRate = simpleTower.fireRate;
    game.refreshGameObjectValues();

    assert.equal(towerRate, simpleTower.fireRateRef / 2);
    assert.equal(game.enemies[0].speed, enemySpeed / 2);
  });
});
