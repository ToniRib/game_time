const SimpleEnemy = require('../../simple-enemy');
const QuickEnemy = require('../../quick-enemy');
const ToastEnemy = require('../../toast-enemy');

let enemiesTwo = {
  createEnemies: function() {
    return [
      new SimpleEnemy({ x: -100, y: 300 }),
      new SimpleEnemy({ x: -200, y: 300 }),
      new QuickEnemy({ x: -600, y: 300 }),
      new QuickEnemy({ x: -700, y: 300 }),
      new ToastEnemy({ x: -800, y: 300 })
    ];
  }
};

module.exports = enemiesTwo;
