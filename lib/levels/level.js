const getBoard = require('./get-board');
const getMonies = require('./get-monies');
const getEnemies = require('./get-enemies');

var Level = function(level, difficulty){
  this.board = getBoard(level);
  this.enemies = getEnemies(level, this.startingY);
  this.monies = getMonies(level);
  this.lives = difficulties[difficulty];
};

var difficulties = {
  1: 5,
  2: 3,
  3: 1
};

module.exports = Level;
