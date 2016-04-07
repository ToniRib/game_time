const enemiesOne = require('./enemies/enemies-one');
const enemiesTwo = require('./enemies/enemies-two');
const enemiesThree = require('./enemies/enemies-three');
const enemiesFour = require('./enemies/enemies-four');
const enemiesFive = require('./enemies/enemies-five');
const enemiesTest = require('./enemies/enemies-test');

let enemies = {
  'test': enemiesTest,
  1: enemiesOne,
  2: enemiesTwo,
  3: enemiesThree,
  4: enemiesFour,
  5: enemiesFive
};

let GetEnemies = function(level) {
  return enemies[level].createEnemies();
};

module.exports = GetEnemies;
