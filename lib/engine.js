const Game = require('./game');
const ImageLoader = require('./image-loader');
const SpriteLoader = require('./sprite-loader');
const AnimationEngine = require('./animation-engine');
const towerIdTranslator = require('./tower-id-translator');
const $ = require('jquery');

let game = new Game();
let imageLoader, spriteLoader, images, sprites;
let mouseDown = false;
let selectedTower = null;
let mouseEnter = false;
let hoverTower = null;

let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let simpleTowerButton = document.getElementById('simple-tower');
let flashTowerButton = document.getElementById('flash-tower');
let heavyDamageTowerButton = document.getElementById('heavy-damage-tower');
let continuousFireTowerButton = document.getElementById('continuous-fire-tower');
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
let $sellButton = $('#sell-button');

loadImages();
loadSprites();

$(document).mousedown(function() {
  if (eventIsOnCanvas(event)) { mouseDown = true; }
}).mouseup(function() {
  if (eventIsOnCanvas(event)) { mouseDown = false; }
});

$('#simple-tower, #heavy-damage-tower, #continuous-fire-tower, #flash-tower').mouseenter(function() {
  mouseEnter = true;
  hoverTower = towerIdTranslator[this.id];
}).mouseleave(function() {
  mouseEnter = false;
  hoverTower = null;
});

function eventIsOnCanvas(event) {
  let eventPosition = getPosition(event);
  return eventPosition.x >= 0 && eventPosition.x <= 800 &&
         eventPosition.y >= 0 && eventPosition.y <= 500;
}

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
    ctx.drawImage(sprites[enemy.type].currentFrame, enemy.x, enemy.y);
  }
}

function drawAnimations(ctx) {
  for (let animation of AnimationEngine.animations) {
    routeAnimation(animation, ctx);
  }
}

function routeAnimation (a, ctx) {
  if (a.nature === 'fire') {
    if(a.tower.isFlashTower()) {
      ctx.drawImage(a.currentFrame, a.tower.x - (a.tower.range / 2), a.tower.y - (a.tower.range / 2));
    } else {
      rotateAndDrawImage(ctx, a);
    }
  } else if (a.nature === 'hit' && a.enemy !== null) {
    if (a.tower.isHeavyDamageTower()) {
      ctx.drawImage(a.currentFrame, a.enemy.x - 5, a.enemy.y - 30);
    } else {
      ctx.drawImage(a.currentFrame, a.enemy.x, a.enemy.y - 11);
    }
  }
}

function rotateAndDrawImage (ctx, animation) {
  let angleInRad = Math.atan2(-((animation.enemy.x + 25) - animation.tower.x),
                              (animation.enemy.y + 25) - animation.tower.y);
  ctx.translate(animation.tower.x, animation.tower.y);
  ctx.rotate(angleInRad);
  ctx.drawImage(animation.currentFrame, -25, 25);
  ctx.rotate(-angleInRad);
  ctx.translate(-animation.tower.x, - animation.tower.y);
}

function drawTowers(ctx) {
  for (let tile of game.getTowerTiles()) {
    ctx.drawImage(sprites[tile.tower.type].currentFrame, tile.x, tile.y);
  }
}

function updateNumberOfLives() { numberOfLives.innerHTML = game.lives; }

function updateMoneyAmount() { moneyAmount.innerHTML = game.monies; }

function updateAnimations() { AnimationEngine.updateAnimations(); }

function getTowerPrice($towerButton) {
  return towerIdTranslator[$towerButton.attr('id')].price;
}

function updateTowerButtons() {
  for (let i = 0; i < towerButtons.length; i ++) {
    let $towerButton = $(towerButtons[i]);
    let towerPrice = getTowerPrice($towerButton);
    let towerButtonState = $towerButton.attr('class').split(' ')[1];

    if (game.canAffordTower(towerPrice) && towerButtonState === 'inactive') {
      $towerButton.addClass('active');
      $towerButton.removeClass('inactive');
    } else if (!game.canAffordTower(towerPrice) && towerButtonState === 'active') {
      $towerButton.removeClass('active');
      $towerButton.addClass('inactive');
    }
  }
}

function fireTowers() {
  let shotEvents = [];
  game.getTowers().forEach(tower => shotEvents.push(tower.shoot(game.retrieveAliveEnemiesOnBoard())));
  triggerAnimations(shotEvents);
}

function triggerAnimations(shootEvents) {
  shootEvents.filter(event => event !== undefined)
             .forEach(event => AnimationEngine.triggerAnimation(event));
}

function nextTick() {
  spriteLoader.updateSprites();
  updateTowerButtons();
  game.removeEnemiesOffRight();
  updateNumberOfLives();
  game.redirectEnemies();
  game.retrieveAliveEnemies().forEach(enemy => enemy.move());
  fireTowers();
  updateAnimations();
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
  if (mouseEnter) { simulateTowerRange(ctx); }
  if (gameNotStarted) { requestAnimationFrame(startLoop); }
}

//  Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard(ctx);
  drawEnemies(ctx);
  drawTowers(ctx);
  drawAnimations(ctx);
  if (mouseDown) { drawTowerRange(ctx); }
  if (mouseEnter) { simulateTowerRange(ctx); }
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
  for (var i = 1; i <= stars; i++) { $('#star-' + i).show(); }
}

function hideAllStars() {
  for (var i = 1; i <= 3; i++) { $('#star-' + i).hide(); }
}

function getPosition(event) {
  return {
    x: event.pageX - canvas.offsetLeft,
    y: event.pageY - canvas.offsetTop
  };
}

function selectTile(event) {
  let clickPosition = getPosition(event);
  game.board.setCurrentTile(clickPosition.x, clickPosition.y);
  game.board.updateTileTypes();
  if (game.board.currentTileIsASelectedBuildTile()) {
    $('#sell-button').show();
  } else {
    $('#sell-button').hide();
  }
}

function assignOrSelectTower() {
  let tower = selectedTower || towerIdTranslator[this.id];

  if (!game.board.currentTileIsAHighlightedBuildTile()) {
    selectedTower = towerIdTranslator[this.id];
  } else if (game.board.currentTileIsAHighlightedBuildTile() && tower && game.canAffordTower(tower.price)) {
    game.placeNewTower(tower);
    selectedTower = null;
  }
}

function drawTowerRange(ctx) {
  if (game.board.currentTileIsABuildTile() && game.board.currentTile.hasTower()) {
    ctx.beginPath();
    ctx.arc(game.board.currentTile.centerX(), game.board.currentTile.centerY(),
            game.board.currentTile.tower.range, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
}

function simulateTowerRange(ctx) {
  if (game.board.currentTileIsAHighlightedBuildTile()) {
    ctx.beginPath();
    ctx.arc(game.board.currentTile.centerX(), game.board.currentTile.centerY(),
            hoverTower.range, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
}

function moveToNextLevel() {
  resetScreen();
  game.loadNextLevel();
  loadImages();
  requestAnimationFrame(startLoop);
}

function moveToNextDifficulty() {
  resetScreen();
  game.loadNextDifficulty();
  requestAnimationFrame(startLoop);
}

function resetLevel() {
  resetScreen();
  game.resetLevel();
  requestAnimationFrame(startLoop);
}

function resetScreen() {
  hideAllStars();
  $winScreen.hide();
  $loseScreen.hide();
  $(canvas).show();
  gameNotStarted = true;
  game.resetClickedTiles();
  resetButtons();
}

canvas.addEventListener("mousedown", selectTile);
canvas.addEventListener("mouseup", assignOrSelectTower);
simpleTowerButton.addEventListener("click", assignOrSelectTower);
flashTowerButton.addEventListener("click", assignOrSelectTower);
heavyDamageTowerButton.addEventListener("click", assignOrSelectTower);
continuousFireTowerButton.addEventListener("click", assignOrSelectTower);
startButton.addEventListener("click", function() {
  gameNotStarted = false;
  replaceStartButtonWithFastFoward();
  requestAnimationFrame(gameLoop);
});

$sellButton.on("click", function() {
  game.sellCurrentTower();
  $sellButton.hide();
});

fastFowardButton.addEventListener('click', function() {
  game.fastFoward();
});

resumeButton.addEventListener('click', function() {
  game.refreshGameObjectValues();
});

function replaceStartButtonWithFastFoward() {
  $startButton.hide();
  $fastFowardButton.show();
}

function resetButtons() {
  $startButton.show();
  $fastFowardButton.hide();
}

$nextLevel.click(moveToNextLevel);
$nextDifficulty.click(moveToNextDifficulty);
$replay.click(resetLevel);
$replayLose.click(resetLevel);
