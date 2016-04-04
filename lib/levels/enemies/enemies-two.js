const SimpleEnemy = require('../../simple-enemy');
const QuickEnemy = require('../../quick-enemy');
const MonsterEnemy = require('../../monster-enemy');

let enemiesTwo = {
  createEnemies: function() {
    return [
      new SimpleEnemy({x: -100, y: 300}),
      new SimpleEnemy({x: -200, y: 300}),
      new SimpleEnemy({x: -300, y: 300}),
      new QuickEnemy({x: -600, y: 300}),
      new QuickEnemy({x: -700, y: 300}),
      new QuickEnemy({x: -500, y: 300}),
      new MonsterEnemy({x: -70, y: 300})
    ];
  }
};

module.exports = enemiesTwo;
