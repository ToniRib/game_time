const Game = require('./game');

let game = new Game();
let board = game.board;

let towers = game.getTowers();
let currentTile = null;

let canvas = document.getElementById('game-canvas');
let simpleTowerButton = document.getElementById('simple-tower');
let flashTowerButton = document.getElementById('flash-tower');
let startButton = document.getElementById('start');
let numberOfLives = document.getElementById('number-of-lives');
let ctx = canvas.getContext('2d');

let images = {
  grassTile: new Image(),
  pathTile: new Image(),
  buildTile: new Image(),
  simpleEnemy: new Image(),
  quickEnemy: new Image(),
  simpleTower: new Image(),
  flashTower: new Image(),
  buildSiteSelect: new Image()
};

init();

function init() {
  images.grassTile.src = 'sprites/grass-2.jpg';
  images.pathTile.src = 'sprites/path.png';
  images.buildTile.src = 'sprites/build-site.jpg';
  images.simpleEnemy.src = 'sprites/orange.gif';
  images.quickEnemy.src = 'sprites/pizza.gif';
  images.simpleTower.src = 'sprites/super-tower-2.png';
  images.flashTower.src = 'sprites/whale-tower.gif';
}

function drawBoard(ctx) {
  for (let { type, x, y } of board.tiles) {
    ctx.drawImage(images[type], x, y);
  }
}

function drawEnemies(ctx) {
  for (let enemy of game.retrieveAliveEnemies()) {
    if (enemy.constructor.name === 'SimpleEnemy'){
      ctx.drawImage(images.simpleEnemy, enemy.x, enemy.y);
    } else {
      ctx.drawImage(images.quickEnemy, enemy.x, enemy.y);
    }
  }
}

function drawTowers(ctx) {
  for (let tileTower of game.getTowerTiles()) {
    if (tileTower.tower.constructor.name === 'SimpleTower'){
      ctx.drawImage(images.simpleTower, tileTower.x, tileTower.y);
    } else {
      ctx.drawImage(images.flashTower, tileTower.x, tileTower.y);
    }
  }
}

function updateNumberOfLives() {
  numberOfLives.innerHTML = game.lives;
}

function nextTick() {
  game.removeEnemiesOffRight();
  updateNumberOfLives();
  game.retrieveAliveEnemies().forEach(enemy => enemy.move());
  towers.forEach(tower => tower.shoot(game.retrieveAliveEnemiesOnBoard()));
}

requestAnimationFrame(startLoop);

//  Draws the initial board before game starts
function startLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateNumberOfLives();
  drawBoard(ctx);
  drawTowers(ctx);
  requestAnimationFrame(startLoop);
}

//  Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBoard(ctx);
  drawEnemies(ctx);
  drawTowers(ctx);
  nextTick();

  if (game.checkStatus() === 'ongoing'){
    requestAnimationFrame(gameLoop);
  } else if (game.checkStatus() === 'lose'){
    requestAnimationFrame(gameLose);
  } else if (game.checkStatus() === 'win'){
    requestAnimationFrame(gameWin);
  }
}

function gameLose() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px sans-serif";
  ctx.fillText("You lost!", 300, 200);
}

function gameWin() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px sans-serif";
  ctx.fillText("You won!", 300, 200);
}

//click events, need somewhere to live.
function getPosition(event) {
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  return { x: x, y: y };
}

function selectTile(event) {
  let clickPosition = getPosition(event);
  currentTile = board.getClickedTile(clickPosition.x, clickPosition.y);
}

function assignSimpleTower() {
  if (currentTile && tileIsABuildTile(currentTile)) {
    currentTile.addTower('simple');
    towers = game.getTowers();
  }
}

function assignFlashTower() {
  if (currentTile) {
    currentTile.addTower('flash');
    towers = game.getTowers();
  }
}

function tileIsABuildTile(tile) {
  return tile.constructor.name === 'BuildTile';
}

canvas.addEventListener("click", selectTile);
simpleTowerButton.addEventListener("click", assignSimpleTower);
flashTowerButton.addEventListener("click", assignFlashTower);
startButton.addEventListener("click", gameLoop);
