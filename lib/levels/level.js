const getBoard = require('./get-board');
const getStartingY = require('./get-starting-y');
const getMonies = require('./get-monies');
const getEnemies = require('./get-enemies');

var Level = function(level){
  this.board = getBoard(level);
  this.startingY = getStartingY(level);
  this.enemies = getEnemies(level);
  this.monies = getMonies(level);
};

module.exports = Level;
