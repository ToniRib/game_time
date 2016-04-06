const boardTest = require('./boards/board-test');
const boardOne = require('./boards/board-one');
const boardTwo = require('./boards/board-two');
const boardThree = require('./boards/board-three');
const boardFour = require('./boards/board-four');
const Board = require('../board');

let boards = {
  'test': new Board(boardTest),
  1: new Board(boardOne),
  2: new Board(boardTwo),
  3: new Board(boardThree),
  4: new Board(boardFour)
};

let GetBoard = function(level) {
  return boards[level];
};

module.exports = GetBoard;
