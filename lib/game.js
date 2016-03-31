const loDash = require('lodash');
const Level = require('./levels/level');

let Game = function () {
  this.currentLevel = new Level(1, 1);
  this.board = this.currentLevel.board;
  this.enemiesInit = this.currentLevel.enemies;
  this.enemies = this.enemiesInit;
  this.monies = this.currentLevel.monies;
  this.lives = this.currentLevel.lives;
};

Game.prototype.updateLevel = function (level, difficulty) {
  this.level = new Level(level, difficulty);
};

Game.prototype.retrieveAliveEnemies = function () {
  this.enemies = this.enemies.filter(function(enemy) {
    return enemy.alive && enemy.active;
  });
  return this.enemies;
};

Game.prototype.rewardMonies = function () {
  let deadEnemies = loDash.difference(this.enemiesInit, this.enemies);

  deadEnemies.forEach(function(enemy){
    this.monies += enemy.price;
  }.bind(this));

  this.enemiesInit = this.enemies;
};

Game.prototype.removeEnemiesOffRight = function() {
  this.enemies.forEach(function(enemy) {
    if (enemy.x > 800) {
      enemy.active = false;
      this.lives -= 1;
    }
  }.bind(this));
};

Game.prototype.retrieveAliveEnemiesOnBoard = function() {
  let enemies = this.retrieveAliveEnemies();
  return enemies.filter(function(enemy) {
    return enemy.x + 50 >= 0 && enemy.x <= 800;
  });
};

Game.prototype.redirectEnemies = function() {
  this.board.getTurnTiles().forEach(function(tile) {
    tile.enemiesInRange(this.enemies).forEach(function(enemy){
      this.changeEnemyDirectionAndReCenter(enemy, tile);
    }.bind(this));
  }.bind(this));
};

Game.prototype.changeEnemyDirectionAndReCenter = function(enemy, tile) {
  let newTurnDirection = tile.turnDirection;
  let originalDirection = enemy.currentDirection;

  enemy.currentDirection = newTurnDirection;

  if (originalDirection !== newTurnDirection) {
    enemy.x = tile.x;
    enemy.y = tile.y;
  }
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
