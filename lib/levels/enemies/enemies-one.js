const SimpleEnemy = require('../../simple-enemy');

let enemiesOne = {
  createEnemies: function() {
    return [
      new SimpleEnemy({ x: -100, y: 200 }),
      new SimpleEnemy({ x: -200, y: 200 }),
      new SimpleEnemy({ x: -300, y: 200 }),
      new SimpleEnemy({ x: -400, y: 200 }),
      new SimpleEnemy({ x: -550, y: 200 }),
      new SimpleEnemy({ x: -650, y: 200 })
    ];
  }
};

module.exports = enemiesOne;
