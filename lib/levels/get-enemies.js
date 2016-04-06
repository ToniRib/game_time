const enemiesOne = require('./enemies/enemies-one');
const enemiesTwo = require('./enemies/enemies-two');
const enemiesThree = require('./enemies/enemies-three');
const enemiesFour = require('./enemies/enemies-four');
const enemiesTest = require('./enemies/enemies-test');

let enemies = {
  'test': enemiesTest,
  1: enemiesOne,
  2: enemiesTwo,
  3: enemiesThree,
  4: enemiesFour
};

let GetEnemies = function(level) {
  return enemies[level].createEnemies();
};

module.exports = GetEnemies;
