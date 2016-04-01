const getBoard = require('./get-board');
const getMonies = require('./get-monies');
const getEnemies = require('./get-enemies');

let difficulties = {
  1: 5,
  2: 3,
  3: 1
};

let Level = function(level, difficulty){
  this.stage = level;
  this.difficulty = difficulty;
  this.board = getBoard(level);
  this.enemies = getEnemies(level, this.startingY);
  this.monies = getMonies(level);
  this.lives = difficulties[difficulty];
};

module.exports = Level;
