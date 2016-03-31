const enemiesOne = require('./enemies/enemies-one');
const enemiesTwo = require('./enemies/enemies-two');

var GetEnemies = function(level) {
  return enemies[level];
};

var enemies = {
  1: enemiesOne,
  2: enemiesTwo
};

module.exports = GetEnemies;
