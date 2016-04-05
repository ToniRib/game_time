const SimpleEnemy = require('../../simple-enemy');
const QuickEnemy = require('../../quick-enemy');
const MonsterEnemy = require('../../monster-enemy');
const ToastEnemy = require('../../toast-enemy');

let enemiesThree = {
  createEnemies: function() {
    return [
      new SimpleEnemy({ x: -100, y: 50 }),
      new SimpleEnemy({ x: -200, y: 50 }),
      new MonsterEnemy({ x: -75, y: 50 }),
      new SimpleEnemy({ x: -300, y: 50 }),
      new SimpleEnemy({ x: -325, y: 50 }),
      new SimpleEnemy({ x: -375, y: 50 }),
      new SimpleEnemy({ x: -400, y: 50 }),
      new SimpleEnemy({ x: -435, y: 50 }),
      new SimpleEnemy({ x: -450, y: 50 }),
      new ToastEnemy({ x: -300, y: 50 }),
      new ToastEnemy({ x: -400, y: 50 }),
      new QuickEnemy({ x: -300, y: 50 }),
      new QuickEnemy({ x: -350, y: 50 }),
      new QuickEnemy({ x: -800, y: 50 }),
      new QuickEnemy({ x: -900, y: 50 }),
      new QuickEnemy({ x: -1000, y: 50 }),
      new QuickEnemy({ x: -1100, y: 50 }),
      new QuickEnemy({ x: -1200, y: 50 }),
      new QuickEnemy({ x: -1450, y: 50 }),
      new MonsterEnemy({ x: -500, y: 50 }),
      new MonsterEnemy({ x: -300, y: 50 }),
      new MonsterEnemy({ x: -600, y: 50 }),
      new ToastEnemy({ x: -900, y: 50 }),
      new ToastEnemy({ x: -1100, y: 50 }),
      new ToastEnemy({ x: -1300, y: 50 }),
      new SimpleEnemy({ x: -950, y: 50 }),
      new SimpleEnemy({ x: -1150, y: 50 }),
      new SimpleEnemy({ x: -1350, y: 50 }),
      new ToastEnemy({ x: -1600, y: 50 }),
      new ToastEnemy({ x: -1650, y: 50 }),
      new ToastEnemy({ x: -1800, y: 50 }),
      new ToastEnemy({ x: -1875, y: 50 }),
      new QuickEnemy({ x: -1450, y: 50 }),
      new QuickEnemy({ x: -1500, y: 50 }),
      new QuickEnemy({ x: -2000, y: 50 }),
      new QuickEnemy({ x: -2200, y: 50 }),
      new SimpleEnemy({ x: -1800, y: 50 }),
      new SimpleEnemy({ x: -1815, y: 50 }),
      new SimpleEnemy({ x: -1820, y: 50 }),
      new SimpleEnemy({ x: -1850, y: 50 }),
      new SimpleEnemy({ x: -1875, y: 50 }),
      new SimpleEnemy({ x: -1900, y: 50 }),
      new ToastEnemy({ x: -1900, y: 50 }),
      new ToastEnemy({ x: -1950, y: 50 }),
      new QuickEnemy({ x: -2300, y: 50 }),
      new QuickEnemy({ x: -2350, y: 50 }),
      new QuickEnemy({ x: -2400, y: 50 }),
      new QuickEnemy({ x: -2425, y: 50 }),
      new QuickEnemy({ x: -4500, y: 50 }),
      new QuickEnemy({ x: -4520, y: 50 }),
      new QuickEnemy({ x: -4530, y: 50 }),
      new QuickEnemy({ x: -4540, y: 50 }),
      new QuickEnemy({ x: -4550, y: 50 })
    ];
  }
};

module.exports = enemiesThree;
