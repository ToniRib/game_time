const Board = require('./board');
const SimpleEnemy = require('./simple-enemy');
let boardOneOptions = require('./board-one-options');

let Game = function () {
  this.board = new Board(boardOneOptions);
  this.turnTiles = this.board.getTurnTiles();
  this.enemies = [new SimpleEnemy({x: -100, y: 200}),
                  new SimpleEnemy({x: -200, y: 200}),
                  new SimpleEnemy({x: -300, y: 200})];
};

Game.prototype.deleteDeadEnemies = function () {
  this.enemies = this.enemies.filter(function(enemy) {
    return enemy.alive;
  });
};

module.exports = Game;
