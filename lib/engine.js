const Game = require('./game');
const FlashTower = require('./flash-tower');
const SimpleTower = require('./simple-tower');
const ImageLoader = require('./image-loader');
const $ = require('jquery');

let game = new Game();
let board = game.board;
let towers = game.getTowers();
let currentTile = null;
let lastTile = null;

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

let simpleTowerButton = document.getElementById('simple-tower');
let flashTowerButton = document.getElementById('flash-tower');
let startButton = document.getElementById('start');
let numberOfLives = document.getElementById('number-of-lives');
let moneyAmount = document.getElementById('money-amount');

let imageLoader = new ImageLoader();
let images = imageLoader.init();

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

function updateNumberOfLives() { numberOfLives.innerHTML = game.lives; }

function updateMoneyAmount() { moneyAmount.innerHTML = game.monies; }

function nextTick() {
  game.removeEnemiesOffRight();
  updateNumberOfLives();
  game.redirectEnemies();
  game.retrieveAliveEnemies().forEach(enemy => enemy.move());
  towers.forEach(tower => tower.shoot(game.retrieveAliveEnemiesOnBoard()));
  game.rewardMonies();
  updateMoneyAmount();
}

// Start game loop - before enemies are called
requestAnimationFrame(startLoop);
let gameNotStarted = true;

function startLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateNumberOfLives();
  updateMoneyAmount();
  drawBoard(ctx);
  drawTowers(ctx);
  if (gameNotStarted) { requestAnimationFrame(startLoop); }
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
  return { x: event.x - canvas.offsetLeft, y: event.y - canvas.offsetTop };
}

function selectTile(event) {
  let clickPosition = getPosition(event);
  lastTile = currentTile;
  currentTile = board.getClickedTile(clickPosition.x, clickPosition.y);


  if (tileIsABuildTile(currentTile) && tileIsAHighlightedBuildTile(lastTile)) {
    lastTile.type = 'buildTile';
    currentTile.type = 'buildTileHighlighted';
    $('#tower-prompt').show();
  } else if (tileIsAHighlightedBuildTile(lastTile) && !tileIsABuildTile(currentTile)) {
    lastTile.type = 'buildTile';
    $('#tower-prompt').hide();
  } else if (tileIsABuildTile(currentTile) && currentTile.vacant) {
    currentTile.type = 'buildTileHighlighted';
    $('#tower-prompt').show();
  }
}

function assignSimpleTower() {
  let simpleTower = new SimpleTower({ x: currentTile.centerX(), y: currentTile.centerY() });

  if (tileIsAHighlightedBuildTile(currentTile) && canAffordTower(simpleTower.price)) {
    currentTile.addTower(simpleTower);
    currentTile.type = 'buildTile';
    $('#tower-prompt').hide();
    towers = game.getTowers();
    game.monies -= simpleTower.price;
  }
}

function assignFlashTower() {
  let flashTower = new FlashTower({ x: currentTile.centerX(), y: currentTile.centerY() });

  if (tileIsAHighlightedBuildTile(currentTile) && canAffordTower(flashTower.price)) {
    currentTile.addTower(flashTower);
    currentTile.type = 'buildTile';
    $('#tower-prompt').hide();
    towers = game.getTowers();
    game.monies -= flashTower.price;
  }
}

function canAffordTower(price) {
  return game.monies >= price;
}

function tileIsABuildTile(tile) {
  return tile && tile.type === 'buildTile';
}

function tileIsAHighlightedBuildTile(tile) {
  return tile && tile.type === 'buildTileHighlighted';
}

canvas.addEventListener("click", selectTile);
simpleTowerButton.addEventListener("click", assignSimpleTower);
flashTowerButton.addEventListener("click", assignFlashTower);
startButton.addEventListener("click", function() {
  gameNotStarted = false;
  requestAnimationFrame(gameLoop);
});
