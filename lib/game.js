const Board = require('./board');
const SimpleEnemy = require('./simple-enemy');
const QuickEnemy = require('./quick-enemy');
let boardOneOptions = require('./test-board-one');
let boardTwoOptions = require('./test-board-two');

let Game = function () {
  this.board = new Board(boardTwoOptions);
  this.startY = 300;
  this.enemies = [new SimpleEnemy({x: -100, y: this.startY}),
                  new SimpleEnemy({x: -200, y: this.startY}),
                  new SimpleEnemy({x: -300, y: this.startY}),
                  new QuickEnemy({x: -600, y: this.startY}),
                  new QuickEnemy({x: -700, y: this.startY}),
                  new QuickEnemy({x: -500, y: this.startY})];
  this.lives = 3;
};

Game.prototype.retrieveAliveEnemies = function () {
  this.enemies = this.enemies.filter(function(enemy) {
    return enemy.alive;
  });

  return this.enemies;
};

Game.prototype.removeEnemiesOffRight = function() {
  this.enemies.forEach(function(enemy) {
    if (enemy.x > 800) {
      enemy.alive = false;
      this.lives -= 1;
    }
  }.bind(this));

  this.retrieveAliveEnemies();
};

Game.prototype.retrieveAliveEnemiesOnBoard = function() {
  let enemies = this.retrieveAliveEnemies();
  return enemies.filter(function(enemy) {
    return enemy.x + 50 >= 0 && enemy.x <= 800;
  });
};

Game.prototype.redirectEnemies = function() {
  this.board.getTurnTiles().forEach(function(tile) {
    let newTurnDirection = tile.turnDirection;
    let enemiesInRange = tile.enemiesInRange(this.enemies);
    enemiesInRange.forEach(function(enemy){
      let originalDirection = enemy.currentDirection;
      enemy.currentDirection = newTurnDirection;
      if (originalDirection !== newTurnDirection) {
        enemy.x = tile.x;
        enemy.y = tile.y;
      }
    });
  }.bind(this));
};

Game.prototype.getTowerTiles = function () {
  return this.board.tiles.filter(function(tile) {
    return tile.tower;
  });
};

Game.prototype.getTowers = function() {
  let towerTiles = this.board.tiles.filter(function(tile) {
    return tile.tower;
  });

  return towerTiles.map(function(tile) {
    return tile.tower;
  });
};

Game.prototype.checkStatus = function() {
  if (this.lives < 1){
    return 'lose';
  } else if (this.lives > 0 && this.enemies.length === 0) {
    return 'win';
  } else {
    return 'ongoing';
  }
};


module.exports = Game;
