const enemiesOne = require('./enemies/enemies-one');
const enemiesTwo = require('./enemies/enemies-two');
const enemiesThree = require('./enemies/enemies-three');
const enemiesTest = require('./enemies/enemies-test');
const SimpleEnemy = require('../simple-enemy');

let enemies = {
  'test': enemiesTest,
  1: enemiesOne,
  2: enemiesTwo,
  3: enemiesThree
};

let GetEnemies = function(level) {
  return enemies[level].createEnemies();
};

module.exports = GetEnemies;
