const $ = require('jquery');

let towerButtons = $('.tower-button');
let $numberOfLives = $('#number-of-lives');
let $moneyAmount = $('#money-amount');
let $sellButton = $('#sell-button');
let $winScreen = $('#win-screen');
let $finalWinScreen = $('#final-win-screen');
let $loseScreen = $('#lose-screen');
let $fastFowardButton = $('#fast-foward-button');
let $startButton = $('#start-button');
let $nextDifficulty = $('#next-difficulty');

let domManipulator = {
  getTowerPrice(button) {
    return parseInt(button.find('.tower-price').text().substr(1));
  },

  updateTowerButtons(game) {
    for (let i = 0; i < towerButtons.length; i ++) {
      let $towerButton = $(towerButtons[i]);
      let towerPrice = this.getTowerPrice($towerButton);
      let towerButtonState = $towerButton.attr('class').split(' ')[1];

      if (game.canAffordTower(towerPrice) && towerButtonState === 'inactive') {
        $towerButton.addClass('active');
        $towerButton.removeClass('inactive');
      } else if (!game.canAffordTower(towerPrice) && towerButtonState === 'active') {
        $towerButton.removeClass('active');
        $towerButton.addClass('inactive');
      }
    }
  },

  updateNumberOfLives(game) {
    $numberOfLives.text(game.lives);
  },

  updateMoneyAmount(game) {
    $moneyAmount.text(game.monies);
  },

  sellButtonDisplay(game) {
    if (game.board.currentTileIsASelectedBuildTile()) {
      $sellButton.show();
    } else {
      $sellButton.hide();
    }
  },

  displayWinScreen(game, canvas) {
    $(canvas).hide();
    $fastFowardButton.hide();
    if (game.currentLevel.stage === game.finalLevel && game.currentLevel.difficulty === 3) {
      $finalWinScreen.show();
    } else {
      $winScreen.show();
      this.showStars(game);

      if (game.currentLevel.difficulty === 3) {
        $nextDifficulty.hide();
      } else {
        $nextDifficulty.show();
      }
    }
  },

  showStars(game) {
    let stars = game.determineNumberOfStars();
    for (var i = 1; i <= stars; i++) { $('#star-' + i).show(); }
  },

  displayLoseScreen(game, canvas) {
    $(canvas).hide();
    $fastFowardButton.hide();
    $loseScreen.show();
  },

  resetScreen(game, canvas) {
    this.hideAllStars();
    $winScreen.hide();
    $finalWinScreen.hide();
    $loseScreen.hide();
    $(canvas).show();
    game.resetClickedTiles();
    this.resetButtons();
  },

  resetButtons() {
    $startButton.show();
    $fastFowardButton.hide();
  },

  hideAllStars() {
    for (var i = 1; i <= 3; i++) { $('#star-' + i).hide(); }
  },

  getPosition(event, canvas) {
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  },

  replaceStartButtonWithFastFoward() {
    $startButton.hide();
    $fastFowardButton.show();
  }
};

module.exports = domManipulator;
