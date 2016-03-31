const Game = require('./game');

let game = new Game();
let board = game.board;
// let enemies = game.enemies;

let towers = game.getTowers();
let currentTile = null;

let canvas = document.getElementById('game-canvas');
let simpleTowerButton = document.getElementById('simple-tower');
let ctx = canvas.getContext('2d');

let images = {
  grassTile: new Image(),
  pathTile: new Image(),
  buildTile: new Image(),
  enemy: new Image(),
  simpleTower: new Image()
};

init();

function init() {
  images.grassTile.src = 'sprites/grass-2.jpg';
  images.pathTile.src = 'sprites/path.png';
  images.buildTile.src = 'sprites/build-site.jpg';
  images.enemy.src = 'sprites/orange.gif';
  images.simpleTower.src = 'sprites/super-tower-2.png';
}

function drawBoard(ctx) {
  for (let { type, x, y } of board.tiles) {
    ctx.drawImage(images[type], x, y);
  }
}

function drawEnemies(ctx) {
  for (let enemy of game.retrieveAliveEnemies()) {
    ctx.drawImage(images.enemy, enemy.x, enemy.y);
  }
}

function drawTowers(ctx) {
  for (let tileTower of game.getTowerTiles()) {
    ctx.drawImage(images.simpleTower, tileTower.x, tileTower.y);
  }
}

function nextTick() {
  game.removeEnemiesOffRight();
  game.retrieveAliveEnemies().forEach(enemy => enemy.move());
  towers.forEach(tower => tower.shoot(game.retrieveAliveEnemiesOnBoard()));
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBoard(ctx);
  drawEnemies(ctx);
  drawTowers(ctx);
  nextTick();
  game.checkStatus();
  // console.log(game.enemies[0].health);

  requestAnimationFrame(gameLoop);
});

function selectTile(event) {
  currentTile = board.getClickedTile(event.clientX, event.clientY);
}

function assignSimpleTower() {
  if (currentTile) {
    currentTile.addTower('simple');
    towers = game.getTowers();
  }
}

canvas.addEventListener("click", selectTile);
simpleTowerButton.addEventListener("click", assignSimpleTower);
