const Game = require('./game');

let game = new Game();
let board = game.board;
let enemies = game.enemies;

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
// var boardImg = canvas.toDataURL('image/png');

let images = {
  grassTile: new Image(),
  pathTile: new Image(),
  buildTile: new Image(),
  enemy: new Image()
};

init();

function init() {
  images.grassTile.src = 'sprites/grass-2.jpg';
  images.pathTile.src = 'sprites/path.png';
  images.buildTile.src = 'sprites/build-site.jpg';
  images.enemy.src = 'sprites/orange.gif';
}

function drawBoard(ctx) {
  for (let { type, x, y } of board.tiles) {
    ctx.drawImage(images[type], x, y);
  }
}

function drawEnemies(ctx) {
  for (let enemy of enemies) {
    ctx.drawImage(images.enemy, enemy.x, enemy.y);
  }
}

function nextTick() {
  enemies.forEach(enemy => enemy.move());
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBoard(ctx);
  drawEnemies(ctx);
  nextTick();

  requestAnimationFrame(gameLoop);
});
