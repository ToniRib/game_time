const enemiesOne = require('./enemies/enemies-one');
const enemiesTwo = require('./enemies/enemies-two');
const enemiesTest = require('./enemies/enemies-test');
const SimpleEnemy = require('../simple-enemy');

let enemies = {
  'test': enemiesTest,
  1: enemiesOne,
  2: enemiesTwo
};

let GetEnemies = function(level) {
  return enemies[level].createEnemies();
};

module.exports = GetEnemies;
