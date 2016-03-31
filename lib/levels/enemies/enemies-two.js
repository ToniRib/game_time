const SimpleEnemy = require('../../simple-enemy');
const QuickEnemy = require('../../quick-enemy');

var enemiesTwo = [
  new SimpleEnemy({x: -100, y: this.startY}),
  new SimpleEnemy({x: -200, y: this.startY}),
  new SimpleEnemy({x: -300, y: this.startY}),
  new QuickEnemy({x: -600, y: this.startY}),
  new QuickEnemy({x: -700, y: this.startY}),
  new QuickEnemy({x: -500, y: this.startY})
];

module.exports = enemiesTwo;
