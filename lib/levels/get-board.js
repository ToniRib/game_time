const boardOne = require('./boards/board-one');
const boardTwo = require('./boards/board-two');
const Board = require('../board');

var GetBoard = function(level) {
  return boards[level];
};

var boards = {
  1: new Board(boardOne),
  2: new Board(boardTwo)
};

module.exports = GetBoard;
