const Tile = require('./tile');
const PathTile = require('./path-tile');
const BuildTile = require('./build-tile');

var Board = function(options) {
  this.tiles = [];
  buildBoard(this.tiles, options);
};

Board.prototype.getClickedTile = function(clickedX, clickedY) {
  return this.tiles.find(tile => clickWithinTile(tile, clickedX, clickedY));
};

Board.prototype.getTurnTiles = function() {
  return this.tiles.filter(tile => tile.isPathTile() && tile.isTurnPoint);
};

Board.prototype.removeAllTowers = function() {
  this.getTilesWithTowers().forEach(tile => tile.removeTower());
};

Board.prototype.getTilesWithTowers = function() {
  return this.tiles.filter(tile => tile.isBuildTile() && tile.hasTower());
};

var clickWithinTile = function(tile, clickedX, clickedY) {
  return withinXRange(tile.x, tile.x + tile.width, clickedX) &&
         withinYRange(tile.y, tile.y + tile.height, clickedY);
};

var withinXRange = function(left, right, value) {
  return left <= value && value < right;
};

var withinYRange = function(top, bottom, value) {
  return top <= value && value < bottom;
};

var buildBoard = function(tiles, options) {
  var count = 0;
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 16; x++) {
      tileDelegate(x, y, tiles, options, count);
      count += 1;
    }
  }
};

var tileDelegate = function(x, y, tiles, options, count) {
  if (isPath(options, count)) {
    tiles.push(new PathTile({ x:(x * 50), y: (y * 50) },
                            options[count].isTurn,
                            options[count].direction));

  } else if (isBuild(options, count)) {
    tiles.push(new BuildTile({ x:(x * 50), y: (y * 50) }));

  } else {
    tiles.push(new Tile({ x:(x * 50), y: (y * 50) }));
  }
};

var isPath = function(options, count){
  return options[count] !== undefined && options[count].type === 'path';
};

var isBuild = function(options, count){
  return options[count] !== undefined && options[count].type === 'build';
};

module.exports = Board;
