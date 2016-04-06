const Game = require('./game');
const domManipulator = require('./dom-manipulator');
const ImageLoader = require('./image-loader');
const SpriteEngine = require('./sprite-engine');
const SimpleTower = require('./simple-tower');
const FlashTower = require('./flash-tower');
const HeavyDamageTower = require('./heavy-damage-tower');
const ContinuousFireTower = require('./continuous-fire-tower');
const animationEngine = require('./animation-engine');
const CanvManip = require('./canvas-manipulator');
const $ = require('jquery');

let game = new Game();
let imageLoader, images, sprites;
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

let $nextDifficulty = $('#next-difficulty');
let $nextLevel = $('#next-level');
let $replay = $('#replay');
let $playAgain = $('#play-again');
let $replayLose = $('#replay-lose');
let $sellButton = $('#sell-button');
let $previousLevel = $('#previous-level');
let $previousLevelLose = $('#previous-level-lose');

loadImages();
loadSprites();

$(document).mousedown(function() {
  if (eventIsOnCanvas(event)) { mouseDown = true; }
}).mouseup(function() {
  if (eventIsOnCanvas(event)) { mouseDown = false; }
});

$('#simple-tower, #heavy-damage-tower, #continuous-fire-tower, #flash-tower').mouseenter(function() {
  mouseEnter = true;
  hoverTower = createTowerType(this.id);
}).mouseleave(function() {
  mouseEnter = false;
  hoverTower = null;
});

function eventIsOnCanvas(event) {
  let eventPosition = domManipulator.getPosition(event, canvas);
  return eventPosition.x >= 0 && eventPosition.x <= 800 &&
         eventPosition.y >= 0 && eventPosition.y <= 500;
}

function loadImages() {
  imageLoader = new ImageLoader();
  images = imageLoader.init(game.currentLevel.stage);
}

function loadSprites() {
  sprites = SpriteEngine.sprites;
}

function updateAnimations() { animationEngine.updateAnimations(); }

function fireTowers() {
  let shotEvents = [];
  game.getTowers().forEach(tower => shotEvents.push(tower.shoot(game.retrieveAliveEnemiesOnBoard())));
  triggerAnimations(shotEvents);
}

function triggerAnimations(shootEvents) {
  shootEvents.filter(event => event !== undefined)
             .forEach(event => animationEngine.triggerAnimation(event));
}

function nextTick() {
  SpriteEngine.updateSprites();
  domManipulator.updateTowerButtons(game);
  game.removeEnemiesOffRight();
  domManipulator.updateNumberOfLives(game);
  game.redirectEnemies();
  game.retrieveAliveEnemies().forEach(enemy => enemy.move());
  fireTowers();
  updateAnimations();
  game.rewardMonies();
  domManipulator.updateMoneyAmount(game);
}

// Start game loop - before enemies are called
requestAnimationFrame(startLoop);
let gameNotStarted = true;

function startLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  domManipulator.updateTowerButtons(game);
  domManipulator.updateNumberOfLives(game);
  domManipulator.updateMoneyAmount(game);
  CanvManip.drawBoard(ctx, game, images);
  CanvManip.drawTowers(ctx, game, sprites);
  if (mouseDown) { CanvManip.drawTowerRange(ctx, game); }
  if (mouseEnter) { CanvManip.simulateTowerRange(ctx, game, hoverTower); }
  if (gameNotStarted) { requestAnimationFrame(startLoop); }
}

//Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  CanvManip.drawBoard(ctx, game, images);
  CanvManip.drawEnemies(ctx, game, sprites);
  CanvManip.drawTowers(ctx, game, sprites);
  CanvManip.drawAnimations(ctx, animationEngine);
  if (mouseDown) { CanvManip.drawTowerRange(ctx, game); }
  if (mouseEnter) { CanvManip.simulateTowerRange(ctx, game, hoverTower); }
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
  domManipulator.displayLoseScreen(game, canvas);
}

function gameWin() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  domManipulator.displayWinScreen(game, canvas);
}

function selectTile(event) {
  let clickPosition = domManipulator.getPosition(event, canvas);
  game.board.setCurrentTile(clickPosition.x, clickPosition.y);
  game.board.updateTileTypes();
  domManipulator.sellButtonDisplay(game);
}

function createTowerType(id) {
  switch (id) {
    case 'simple-tower':
      return new SimpleTower({x: 0, y:0 });
    case 'flash-tower':
      return new FlashTower({x: 0, y:0 });
    case 'heavy-damage-tower':
      return new HeavyDamageTower({x: 0, y:0 });
    case 'continuous-fire-tower':
      return new ContinuousFireTower({x: 0, y:0 });
  }
}

function assignOrSelectTower() {
  let tower = selectedTower || createTowerType(this.id);

  if (!game.board.currentTileIsAHighlightedBuildTile()) {
    selectedTower = createTowerType(this.id);
  } else if (game.board.currentTileIsAHighlightedBuildTile() && tower && game.canAffordTower(tower.price)) {
    game.placeNewTower(tower);
    selectedTower = null;
  }
}

function moveToNextLevel() {
  domManipulator.resetScreen(game, canvas);
  gameNotStarted = true;
  game.loadNextLevel();
  loadImages();
  requestAnimationFrame(startLoop);
}

function moveToPreviousLevel() {
  domManipulator.resetScreen(game, canvas);
  gameNotStarted = true;
  game.loadPreviousLevel();
  loadImages();
  requestAnimationFrame(startLoop);
}

function moveToNextDifficulty() {
  domManipulator.resetScreen(game, canvas);
  gameNotStarted = true;
  game.loadNextDifficulty();
  requestAnimationFrame(startLoop);
}

function resetLevel() {
  domManipulator.resetScreen(game, canvas);
  gameNotStarted = true;
  game.resetLevel();
  requestAnimationFrame(startLoop);
}

function resetGame() {
  domManipulator.resetScreen(game, canvas);
  gameNotStarted = true;
  game.updateLevel(1, 1);
  loadImages();
  requestAnimationFrame(startLoop);
}

canvas.addEventListener("mousedown", selectTile);
canvas.addEventListener("mouseup", assignOrSelectTower);
simpleTowerButton.addEventListener("click", assignOrSelectTower);
flashTowerButton.addEventListener("click", assignOrSelectTower);
heavyDamageTowerButton.addEventListener("click", assignOrSelectTower);
continuousFireTowerButton.addEventListener("click", assignOrSelectTower);
startButton.addEventListener("click", function() {
  gameNotStarted = false;
  domManipulator.replaceStartButtonWithFastFoward();
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

$nextLevel.click(moveToNextLevel);
$nextDifficulty.click(moveToNextDifficulty);
$replay.click(resetLevel);
$replayLose.click(resetLevel);
$playAgain.click(resetGame);
$previousLevel.click(moveToPreviousLevel);
$previousLevelLose.click(moveToPreviousLevel);
