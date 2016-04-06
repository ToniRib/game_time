const loDash = require('lodash');
const Level = require('./levels/level');

let Game = function () {
  this.currentLevel = new Level(1, 1);
  this.finalLevel = 4;
  this.loadLevelParameters();
};

Game.prototype.updateLevel = function (level, difficulty) {
  this.currentLevel = new Level(level, difficulty);
  this.loadLevelParameters();
  this.refreshGameObjectValues();
};

Game.prototype.loadLevelParameters = function() {
  this.board = this.currentLevel.board;
  this.enemiesInit = this.currentLevel.enemies;
  this.enemies = this.enemiesInit;
  this.monies = this.currentLevel.monies;
  this.lives = this.currentLevel.lives;
};

Game.prototype.loadNextLevel = function () {
  this.board.removeAllTowers();
  this.updateLevel(this.currentLevel.stage + 1, 1);
};

Game.prototype.loadPreviousLevel = function () {
  this.board.removeAllTowers();
  this.updateLevel(this.currentLevel.stage - 1, 1);
};

Game.prototype.loadNextDifficulty = function () {
  if (this.currentLevel.difficulty === 3) {
    return this.loadNextLevel();
  }

  this.board.removeAllTowers();
  this.updateLevel(this.currentLevel.stage, this.currentLevel.difficulty + 1);
};

Game.prototype.resetLevel = function() {
  this.board.removeAllTowers();
  this.updateLevel(this.currentLevel.stage, this.currentLevel.difficulty);
};

Game.prototype.retrieveAliveEnemies = function () {
  this.enemies = this.enemies.filter(enemy => enemy.alive && enemy.active);
  return this.enemies;
};

let stars = {
  1: { 5: 3, 4: 2, 3: 1, 2: 1, 1: 1 },
  2: { 3: 3, 2: 2, 1: 1 },
  3: { 1: 3 }
};

Game.prototype.determineNumberOfStars = function() {
  return stars[this.currentLevel.difficulty][this.lives];
};

Game.prototype.rewardMonies = function () {
  let deadEnemies = loDash.difference(this.enemiesInit, this.enemies);

  deadEnemies.forEach(function(enemy){
    if (enemy.active) { this.monies += enemy.price; }
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
  return enemies.filter(enemy => enemy.x + 50 >= 0 && enemy.x <= 800);
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
  return this.board.tiles.filter(tile => tile.tower);
};

Game.prototype.getTowers = function() {
  return this.getTowerTiles().map(tile => tile.tower);
};

Game.prototype.placeNewTower = function(tower) {
  tower.x = this.board.currentTile.centerX();
  tower.y = this.board.currentTile.centerY();
  this.board.currentTile.addTower(tower);
  this.board.currentTile.type = 'buildTile';
  this.monies -= tower.price;
};

Game.prototype.sellCurrentTower = function() {
  this.monies += Math.ceil((this.board.currentTile.tower.price / 2));
  this.board.currentTile.tower = null;
  this.board.currentTile.vacant = true;
  this.board.currentTile.type = 'buildTile';
};

Game.prototype.fastFoward = function() {
  this.getTowers().forEach(function(tower) {
    tower.fireRate = (tower.fireRate / 2);
  });
  this.enemies.forEach(function(enemy) {
    enemy.speed = (enemy.speed * 2);
  });
  this.board.getTurnTiles().forEach(function(tile) {
    tile.rangeBuffer = (tile.rangeBuffer * 2);
  });
};

Game.prototype.resetClickedTiles = function() {
  this.board.currentTile = null;
  this.board.lastTile = null;
  this.board.getHighlightedOrSelectedBuildTiles().forEach(tile => tile.type = 'buildTile');
};

Game.prototype.refreshGameObjectValues = function(){
  this.getTowers().forEach(tower => tower.fireRate = tower.fireRateRef);
  this.enemies.forEach(enemy => enemy.speed = enemy.speedRef);
  this.board.getTurnTiles().forEach(tile => tile.rangeBuffer = tile.rangeBufferRef);
};

Game.prototype.canAffordTower = function(towerPrice) {
  return towerPrice <= this.monies;
};

Game.prototype.checkStatus = function() {
  if (this.lives < 1) {
    return 'lose';
  } else if (this.lives > 0 && this.enemies.length === 0) {
    return 'win';
  } else {
    return 'ongoing';
  }
};

Game.prototype.isOver = function() {
  return this.currentLevel.stage === this.finalLevel &&
         this.currentLevel.difficulty === 3;
};

module.exports = Game;
