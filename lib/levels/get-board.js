const boardTest = require('./boards/board-test');
const boardOne = require('./boards/board-one');
const boardTwo = require('./boards/board-two');
const Board = require('../board');

let boards = {
  'test': new Board(boardTest),
  1: new Board(boardOne),
  2: new Board(boardTwo)
};

let GetBoard = function(level) {
  return boards[level];
};

module.exports = GetBoard;
