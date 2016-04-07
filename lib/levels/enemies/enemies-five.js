const SimpleEnemy = require('../../simple-enemy');
const QuickEnemy = require('../../quick-enemy');
const MonsterEnemy = require('../../monster-enemy');
const ToastEnemy = require('../../toast-enemy');


let enemiesFour = {
  createEnemies: function() {
    return [
      new MonsterEnemy({ x: -50, y:50 }),
      new MonsterEnemy({ x: -75, y:50 }),
      new MonsterEnemy({ x: -100, y:50 }),

      new SimpleEnemy({ x: -50, y:50 }),
      new SimpleEnemy({ x: -75, y:50 }),
      new SimpleEnemy({ x: -100, y:50 }),
      new SimpleEnemy({ x: -125, y:50 }),
      new SimpleEnemy({ x: -150, y:50 }),
      new SimpleEnemy({ x: -175, y:50 }),
      new SimpleEnemy({ x: -200, y:50 }),
      new SimpleEnemy({ x: -225, y:50 }),
      new SimpleEnemy({ x: -250, y:50 }),
      new SimpleEnemy({ x: -275, y:50 }),
      new SimpleEnemy({ x: -300, y:50 }),
      new SimpleEnemy({ x: -325, y:50 }),
      new SimpleEnemy({ x: -350, y:50 }),
      new SimpleEnemy({ x: -375, y:50 }),
      new SimpleEnemy({ x: -400, y:50 }),
      new SimpleEnemy({ x: -425, y:50 }),

      new QuickEnemy({ x: -5050, y:50 }),
      new QuickEnemy({ x: -5075, y:50 }),
      new QuickEnemy({ x: -5100, y:50 }),
      new QuickEnemy({ x: -5125, y:50 }),
      new QuickEnemy({ x: -5150, y:50 }),
      new QuickEnemy({ x: -5175, y:50 }),
      new QuickEnemy({ x: -5200, y:50 }),
      new QuickEnemy({ x: -5225, y:50 }),
      new QuickEnemy({ x: -5250, y:50 }),
      new QuickEnemy({ x: -5275, y:50 }),
      new QuickEnemy({ x: -5300, y:50 }),
      new QuickEnemy({ x: -5325, y:50 }),
      new QuickEnemy({ x: -5350, y:50 }),
      new QuickEnemy({ x: -5375, y:50 }),
      new QuickEnemy({ x: -5400, y:50 }),
      new QuickEnemy({ x: -5425, y:50 }),

      new QuickEnemy({ x: -10050, y:50 }),
      new QuickEnemy({ x: -10075, y:50 }),
      new QuickEnemy({ x: -10100, y:50 }),
      new QuickEnemy({ x: -10125, y:50 }),
      new QuickEnemy({ x: -10150, y:50 }),
      new QuickEnemy({ x: -10175, y:50 }),
      new QuickEnemy({ x: -10200, y:50 }),
      new QuickEnemy({ x: -10225, y:50 }),
      new QuickEnemy({ x: -10250, y:50 }),
      new QuickEnemy({ x: -10275, y:50 }),
      new QuickEnemy({ x: -10300, y:50 }),
      new QuickEnemy({ x: -10325, y:50 }),
      new QuickEnemy({ x: -10350, y:50 }),
      new QuickEnemy({ x: -10375, y:50 }),
      new QuickEnemy({ x: -10400, y:50 }),
      new QuickEnemy({ x: -10425, y:50 }),

      new ToastEnemy({ x: -50, y:50 }),
      new ToastEnemy({ x: -250, y:50 }),
      new ToastEnemy({ x: -450, y:50 }),
      new ToastEnemy({ x: -650, y:50 }),
      new ToastEnemy({ x: -850, y:50 }),
      new ToastEnemy({ x: -1050, y:50 }),
      new ToastEnemy({ x: -1250, y:50 }),
      new ToastEnemy({ x: -1450, y:50 }),
      new ToastEnemy({ x: -1650, y:50 }),
      new ToastEnemy({ x: -1850, y:50 }),
      new ToastEnemy({ x: -2050, y:50 }),
      new ToastEnemy({ x: -2250, y:50 }),
      new ToastEnemy({ x: -2450, y:50 }),
      new ToastEnemy({ x: -2650, y:50 }),
      new ToastEnemy({ x: -2850, y:50 }),
      new ToastEnemy({ x: -3050, y:50 }),
    ];
  }
};

module.exports = enemiesFour;
