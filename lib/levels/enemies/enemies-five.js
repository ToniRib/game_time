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

      new ToastEnemy({ x: -1050, y:50 }),
      new ToastEnemy({ x: -1075, y:50 }),
      new ToastEnemy({ x: -1100, y:50 }),
      new ToastEnemy({ x: -1125, y:50 }),
      new ToastEnemy({ x: -1150, y:50 }),
      new ToastEnemy({ x: -1175, y:50 }),
      new ToastEnemy({ x: -1200, y:50 }),
      new ToastEnemy({ x: -1225, y:50 }),
      new ToastEnemy({ x: -1250, y:50 }),
      new ToastEnemy({ x: -1275, y:50 }),
      new ToastEnemy({ x: -1300, y:50 }),
      new ToastEnemy({ x: -1325, y:50 }),
      new ToastEnemy({ x: -1350, y:50 }),
      new ToastEnemy({ x: -1375, y:50 }),
      new ToastEnemy({ x: -1400, y:50 }),
      new ToastEnemy({ x: -1425, y:50 }),
    ];
  }
};

module.exports = enemiesFour;
