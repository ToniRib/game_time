const Game = require('./game');
const FlashTower = require('./flash-tower');
const SimpleTower = require('./simple-tower');
const HeavyDamageTower = require('./heavy-damage-tower');
const ContinuousFireTower = require('./continuous-fire-tower');
const ImageLoader = require('./image-loader');
const SpriteEngine = require('./sprite-loader');
const AnimationEnginePrime = require('./animation-engine');
const $ = require('jquery');

let game = new Game();
let currentTile = null;
let lastTile = null;
let imageLoader, spriteEngine, images, sprites;
let mouseDown = false;
let selectedTower = null;
let mouseEnter = false;
let hoverTower = null;

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
  let eventPosition = getPosition(event);
  return eventPosition.x >= 0 && eventPosition.x <= 800 &&
         eventPosition.y >= 0 && eventPosition.y <= 500;
}

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

$fastFowardButton.hide();

let animationEngine = new AnimationEnginePrime();
loadImages();
loadSprites();

function loadImages() {
  imageLoader = new ImageLoader();
  images = imageLoader.init(game.currentLevel.stage);
}

function loadSprites() {
  spriteEngine = new SpriteEngine();
  sprites = spriteEngine.sprites;
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
  for (let animation of animationEngine.animations) {
    routeAnimation(animation, ctx);
  }
}

function routeAnimation (a, ctx) {
  if (a.nature === 'fire') {
    if(a.tower.type === 'flashTower') {
      ctx.drawImage(a.currentFrame, a.tower.x - (a.tower.range / 2), a.tower.y - (a.tower.range / 2));
    } else {
      rotateAndDrawImage(ctx, a);
    }
  } else if (a.nature === 'hit' && a.enemy !== null) {
    if (a.tower.type === 'heavyDamageTower') {
      ctx.drawImage(a.currentFrame, a.enemy.x - 5, a.enemy.y - 30);
    } else {
      ctx.drawImage(a.currentFrame, a.enemy.x, a.enemy.y - 11);
    }
  }
}

function rotateAndDrawImage (ctx, animation) {
  let angleInRad = Math.atan2(-((animation.enemy.x + 25) - animation.tower.x),
                              (animation.enemy.y + 25) - animation.tower.y);
  ctx.translate( animation.tower.x, animation.tower.y );
  ctx.rotate( angleInRad );
  ctx.drawImage( animation.currentFrame, -25, 25);
  ctx.rotate( - angleInRad );
  ctx.translate( - animation.tower.x, - animation.tower.y);
}

function drawTowers(ctx) {
  for (let tile of game.getTowerTiles()) {
    ctx.drawImage(sprites[tile.tower.type].currentFrame, tile.x, tile.y);
  }
}

function updateNumberOfLives() { numberOfLives.innerHTML = game.lives; }

function updateMoneyAmount() { moneyAmount.innerHTML = game.monies; }

function updateAnimations() { animationEngine.updateAnimations(); }

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

function fireTowers(){
  let lastShotEvents = [];
  game.getTowers().forEach(tower => lastShotEvents.push(tower.shoot(game.retrieveAliveEnemiesOnBoard())));
  triggerAnimation(lastShotEvents);
}

function triggerAnimation(shootEvents){
  shootEvents.forEach(function(shootEvent){
    if (shootEvent !== undefined){
      animationEngine.triggerAnimation(shootEvent);
    }
  });
}

function nextTick() {
  spriteEngine.updateSprites();
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
  for (var i = 1; i <= stars; i++) {
    $('#star-' + i).show();
  }
}

function hideAllStars() {
  for (var i = 1; i <= 3; i++) { $('#star-' + i).hide(); }
}

//click events, need somewhere to live.
function getPosition(event) {
  return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
}

function selectTile(event) {
  let clickPosition = getPosition(event);
  lastTile = currentTile;
  currentTile = game.board.getClickedTile(clickPosition.x, clickPosition.y);

  if (tileIsABuildTile(currentTile) && (tileIsAHighlightedBuildTile(lastTile) || tileIsASelectedBuildTile(lastTile)) && currentTile.vacant) {
    lastTile.type = 'buildTile';
    currentTile.type = 'buildTileHighlighted';
    $('#sell-button').hide();
  } else if ((tileIsAHighlightedBuildTile(lastTile) || tileIsASelectedBuildTile(lastTile)) && !tileIsABuildTile(currentTile)) {
    lastTile.type = 'buildTile';
    $('#sell-button').hide();
  } else if (tileIsABuildTile(currentTile) && currentTile.vacant) {
    currentTile.type = 'buildTileHighlighted';
    $('#sell-button').hide();
  } else if (tileIsABuildTile(currentTile)) {
    currentTile.type = 'buildTileSelected';
    if (tileIsAHighlightedBuildTile(lastTile)) { lastTile.type = 'buildTile'; }
    $('#sell-button').show();
  }
}

function assignOrSelectTower() {
  let tower = selectedTower || createTowerType(this.id);

  if (!tileIsAHighlightedBuildTile(currentTile)) {
    selectedTower = createTowerType(this.id);
  } else if (tileIsAHighlightedBuildTile(currentTile) && tower && canAffordTower(tower.price)) {
    tower.x = currentTile.centerX();
    tower.y = currentTile.centerY();
    currentTile.addTower(tower);
    currentTile.type = 'buildTile';
    selectedTower = null;
    game.monies -= tower.price;
  }
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

function canAffordTower(price) {
  return game.monies >= price;
}

function tileIsABuildTile(tile) {
  return tile && tile.type === 'buildTile';
}

function tileIsAHighlightedBuildTile(tile) {
  return tile && tile.type === 'buildTileHighlighted';
}

function tileIsASelectedBuildTile(tile) {
  return tile && tile.type === 'buildTileSelected';
}

function tileHasATower(tile) {
  return tile.tower !== undefined;
}

function drawTowerRange(ctx) {
  if (tileIsABuildTile(currentTile) && tileHasATower(currentTile)) {
    ctx.beginPath();
    ctx.arc(currentTile.centerX(), currentTile.centerY(),
            currentTile.tower.range, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
}

function simulateTowerRange(ctx) {
  if (tileIsAHighlightedBuildTile(currentTile)) {
    ctx.beginPath();
    ctx.arc(currentTile.centerX(), currentTile.centerY(),
            hoverTower.range, 0, 2 * Math.PI, false);
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
canvas.addEventListener("mousedown", assignOrSelectTower);
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
  game.monies += (currentTile.tower.price / 2);
  currentTile.tower = null;
  currentTile.vacant = true;
  currentTile.type = 'buildTile';
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
