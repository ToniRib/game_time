const Board = require('./board');
const SimpleEnemy = require('./simple-enemy');
const QuickEnemy = require('./quick-enemy');
let boardOneOptions = require('./board-one-options');

let Game = function () {
  this.board = new Board(boardOneOptions);
  this.turnTiles = this.board.getTurnTiles();
  this.enemies = [new SimpleEnemy({x: -100, y: 200}),
                  new SimpleEnemy({x: -200, y: 200}),
                  new SimpleEnemy({x: -300, y: 200}),
                  new QuickEnemy({x: -600, y: 200}),
                  new QuickEnemy({x: -500, y: 200})];
  this.lives = 1;
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
