const SimpleEnemy = require('../../simple-enemy');
const QuickEnemy = require('../../quick-enemy');

var enemiesOne = [
  new SimpleEnemy({x: -100, y: this.startY}),
  new SimpleEnemy({x: -200, y: this.startY}),
  new SimpleEnemy({x: -300, y: this.startY})
];

module.exports = enemiesOne;
