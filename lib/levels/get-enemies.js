const enemiesOne = require('./enemies/enemies-one');
const enemiesTwo = require('./enemies/enemies-two');
const enemiesTest = require('./enemies/enemies-test');

let GetEnemies = function(level) {
  return enemies[level];
};

let enemies = {
  'test': enemiesTest,
  1: enemiesOne,
  2: enemiesTwo
};

module.exports = GetEnemies;
