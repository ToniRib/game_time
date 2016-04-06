const $ = require('jquery');

let towerButtons = $('.tower-button');
let $numberOfLives = $('#number-of-lives');
let $moneyAmount = $('#money-amount');
let $sellButton = $('#sell-button');

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
  }
};

module.exports = domManipulator;
