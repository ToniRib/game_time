const Game = require('./game');
const FlashTower = require('./flash-tower');
const SimpleTower = require('./simple-tower');
const ImageLoader = require('./image-loader');
const SpriteLoader = require('./sprite-loader');
const $ = require('jquery');

let game = new Game();
let currentTile = null;
let lastTile = null;
let imageLoader, spriteLoader, images, sprites;
var mouseDown = false;

$(document).mousedown(function() {
  mouseDown = true;
}).mouseup(function() {
  mouseDown = false;
});

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let simpleTowerButton = document.getElementById('simple-tower');
let flashTowerButton = document.getElementById('flash-tower');
let startButton = document.getElementById('start');
let fastFowardButton = document.getElementById('ff');
let resumeButton = document.getElementById('play');
let numberOfLives = document.getElementById('number-of-lives');
let moneyAmount = document.getElementById('money-amount');

let towerButtons = $('.tower-button');
let $winScreen = $('#win-screen');
let $loseScreen = $('#lose-screen');
let $fastFowardButton = $('#fast-foward-button');
let $startButton = $('#start-button');
let $nextDifficulty = $('#next-difficulty');
let $nextLevel = $('#next-level');
let $replay = $('#replay');
let $replayLose = $('#replay-lose');
let $towerPrompt = $('#tower-prompt');
let $clickBuildSitePrompt = $('#click-build-site-prompt');


$fastFowardButton.hide();
loadImages();
loadSprites();

function loadImages() {
  imageLoader = new ImageLoader();
  images = imageLoader.init(game.currentLevel.stage);
}

function loadSprites() {
  spriteLoader = new SpriteLoader();
  sprites = spriteLoader.sprites;
}

function drawBoard(ctx) {
  for (let { type, x, y } of game.board.tiles) {
    ctx.drawImage(images[type], x, y);
  }
}

function drawEnemies(ctx) {
  for (let enemy of game.retrieveAliveEnemies()) {
    if (enemy.constructor.name === 'SimpleEnemy'){
      ctx.drawImage(sprites.simpleEnemy.currentFrame, enemy.x, enemy.y + 10);
    } else {
      ctx.drawImage(sprites.quickEnemy.currentFrame, enemy.x, enemy.y);
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

function getTowerPrice(towerButton) {
  return parseInt($(towerButton).find('.tower-price').text().substr(1));
}

function updateTowerButtons() {
  for (let i = 0; i < towerButtons.length; i ++) {
    let towerPrice = getTowerPrice(towerButtons[i]);
    let currentMonies = game.monies;
    let towerButtonState = $(towerButtons[i]).attr('class').split(' ')[1];

    if (towerPrice <= currentMonies && towerButtonState === 'inactive') {
      $(towerButtons[i]).addClass('active');
      $(towerButtons[i]).removeClass('inactive');
    } else if (towerPrice > currentMonies && towerButtonState === 'active') {
      $(towerButtons[i]).removeClass('active');
      $(towerButtons[i]).addClass('inactive');
    }
  }
}

function nextTick() {
  spriteLoader.updateSprites();
  updateTowerButtons();
  game.removeEnemiesOffRight();
  updateNumberOfLives();
  game.redirectEnemies();
  game.retrieveAliveEnemies().forEach(enemy => enemy.move());
  game.getTowers().forEach(tower => tower.shoot(game.retrieveAliveEnemiesOnBoard()));
  game.rewardMonies();
  updateMoneyAmount();
}

// Start game loop - before enemies are called
requestAnimationFrame(startLoop);
let gameNotStarted = true;

function startLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateTowerButtons();
  updateNumberOfLives();
  updateMoneyAmount();
  drawBoard(ctx);
  drawTowers(ctx);
  if (mouseDown) { drawTowerRange(ctx); }
  if (gameNotStarted) { requestAnimationFrame(startLoop); }
}

//  Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard(ctx);
  drawEnemies(ctx);
  drawTowers(ctx);
  if (mouseDown) { drawTowerRange(ctx); }
  nextTick();

  if (game.checkStatus() === 'ongoing') {
    requestAnimationFrame(gameLoop);
  } else if (game.checkStatus() === 'lose') {
    requestAnimationFrame(gameLose);
  } else if (game.checkStatus() === 'win') {
    requestAnimationFrame(gameWin);
  }
}

function gameLose() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  $(canvas).hide();
  $fastFowardButton.hide();
  $loseScreen.show();
}

function gameWin() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  $(canvas).hide();
  $fastFowardButton.hide();
  $winScreen.show();
  showStars();

  if (game.currentLevel.difficulty === 3) {
    $nextDifficulty.hide();
  } else {
    $nextDifficulty.show();
  }
}

function showStars() {
  let stars = game.determineNumberOfStars();
  for (var i = 1; i <= stars; i++) {
    $('#star-' + i).show();
  }
}

function hideAllStars() {
  for (var i = 1; i <= 3; i++) { $('#star-' + i).hide(); }
}

//click events, need somewhere to live.
function getPosition(event) {
  return { x: event.x - canvas.offsetLeft, y: event.y - canvas.offsetTop };
}

function selectTile(event) {
  let clickPosition = getPosition(event);
  lastTile = currentTile;
  currentTile = game.board.getClickedTile(clickPosition.x, clickPosition.y);

  if (tileIsABuildTile(currentTile) && tileIsAHighlightedBuildTile(lastTile)) {
    lastTile.type = 'buildTile';
    currentTile.type = 'buildTileHighlighted';
    $towerPrompt.show();
    $clickBuildSitePrompt.hide();
  } else if (tileIsAHighlightedBuildTile(lastTile) && !tileIsABuildTile(currentTile)) {
    lastTile.type = 'buildTile';
    $towerPrompt.hide();
    $clickBuildSitePrompt.show();
  } else if (tileIsABuildTile(currentTile) && currentTile.vacant) {
    currentTile.type = 'buildTileHighlighted';
    $towerPrompt.show();
    $clickBuildSitePrompt.hide();
  }
}

function assignSimpleTower() {
  let simpleTower = new SimpleTower({ x: currentTile.centerX(), y: currentTile.centerY() });

  if (tileIsAHighlightedBuildTile(currentTile) && canAffordTower(simpleTower.price)) {
    currentTile.addTower(simpleTower);
    currentTile.type = 'buildTile';
    $towerPrompt.hide();
    $clickBuildSitePrompt.show();
    game.monies -= simpleTower.price;
  }
}

function assignFlashTower() {
  let flashTower = new FlashTower({ x: currentTile.centerX(), y: currentTile.centerY() });

  if (tileIsAHighlightedBuildTile(currentTile) && canAffordTower(flashTower.price)) {
    currentTile.addTower(flashTower);
    currentTile.type = 'buildTile';
    $towerPrompt.hide();
    $clickBuildSitePrompt.show();
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

function tileHasATower(tile) {
  return tile.tower !== undefined;
}

function drawTowerRange(ctx) {
  if (tileIsABuildTile(currentTile) && tileHasATower(currentTile)) {
    ctx.beginPath();
    ctx.arc(currentTile.centerX(), currentTile.centerY(),
            currentTile.tower.range + 25, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
}

function moveToNextLevel() {
  resetScreen();
  game.loadNextLevel();
  loadImages();
  game.refreshGameObjectValues();
  requestAnimationFrame(startLoop);
}

function moveToNextDifficulty() {
  resetScreen();
  game.loadNextDifficulty();
  game.refreshGameObjectValues();
  requestAnimationFrame(startLoop);
}

function resetLevel() {
  resetScreen();
  game.resetLevel();
  game.refreshGameObjectValues();
  requestAnimationFrame(startLoop);
}

function resetScreen() {
  hideAllStars();
  $winScreen.hide();
  $loseScreen.hide();
  $(canvas).show();
  resetParameters();
  resetButtons();
}

function resetParameters() {
  gameNotStarted = true;
  currentTile = null;
  lastTile = null;
}

canvas.addEventListener("mousedown", selectTile);
simpleTowerButton.addEventListener("click", assignSimpleTower);
flashTowerButton.addEventListener("click", assignFlashTower);
startButton.addEventListener("click", function() {
  gameNotStarted = false;
  replaceStartButtonWithFastFoward();
  requestAnimationFrame(gameLoop);
});

fastFowardButton.addEventListener('click', function(){
  game.fastFoward();
});

resumeButton.addEventListener('click', function(){
  game.refreshGameObjectValues();
});

function replaceStartButtonWithFastFoward(){
  $startButton.hide();
  $fastFowardButton.show();
}

function resetButtons(){
  $startButton.show();
  $fastFowardButton.hide();
}

$nextLevel.click(moveToNextLevel);
$nextDifficulty.click(moveToNextDifficulty);
$replay.click(resetLevel);
$replayLose.click(resetLevel);
