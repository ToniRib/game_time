const Game = require('./game');

let game = new Game();
let board = game.board;
let enemies = game.enemies;

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

let renderBoard = function(board) {
  for (let i = 0; i < 160; i++) {
    let img = new Image();
    let currentTile = board.tiles[i];

    img.onload = function () {
      ctx.drawImage(img, currentTile.x, currentTile.y);
    };

    img.src = currentTile.sprite;
  }
};

let moveEnemies = function(enemies) {
  enemies.forEach(function(enemy) {
    enemy.move();
  });
};

requestAnimationFrame(gameLoop);

function gameLoop() {
  moveEnemies(enemies);
  renderBoard(board);
  requestAnimationFrame(gameLoop);
}
