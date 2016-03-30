const Board = require('./board');
let boardOneOptions = require('./board-one-options');

let Game = function () {
  this.board = new Board(boardOneOptions);
};

module.exports = Game;
