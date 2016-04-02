const enemiesOne = require('./enemies/enemies-one');
const enemiesTwo = require('./enemies/enemies-two');
const enemiesTest = require('./enemies/enemies-test');
const SimpleEnemy = require('../simple-enemy');

let enemies = {
  'test': enemiesTest,
  1: enemiesOne,
  2: enemiesTwo,
  reset: function() {
    this[1] = [
      new SimpleEnemy({ x: -100, y: 200 }),
      new SimpleEnemy({ x: -200, y: 200 }),
      new SimpleEnemy({ x: -300, y: 200 })
    ];
  }
};

let GetEnemies = function(level) {
  enemies.reset();
  return enemies[level];
};

module.exports = GetEnemies;
