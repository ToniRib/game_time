const CanvasManipulator = {

  drawBoard(ctx, game, images) {
    for (let { type, x, y } of game.board.tiles) {
      ctx.drawImage(images[type], x, y);
    }
  },

  drawEnemies(ctx, game, sprites) {
    for (let enemy of game.retrieveAliveEnemies()) {
      ctx.drawImage(sprites[enemy.type].currentFrame, enemy.x, enemy.y);
    }
  },

  drawAnimations(ctx, animationEngine) {
    for (let animation of animationEngine.animations) {
      this.routeAnimation(animation, ctx);
    }
  },

  routeAnimation (a, ctx) {
    if (a.nature === 'fire') {
      if(a.tower.isFlashTower()) {
        ctx.drawImage(a.currentFrame, a.tower.x - (a.tower.range / 2), a.tower.y - (a.tower.range / 2));
      } else {
        this.rotateAndDrawImage(ctx, a);
      }
    } else if (a.nature === 'hit' && a.enemy) {
      if (a.tower.isHeavyDamageTower()) {
        ctx.drawImage(a.currentFrame, a.enemy.x - 5, a.enemy.y - 30);
      } else {
        ctx.drawImage(a.currentFrame, a.enemy.x, a.enemy.y - 11);
      }
    }
  },

  rotateAndDrawImage (ctx, animation) {
    let angleInRad = Math.atan2(-((animation.enemy.x + 25) - animation.tower.x),
                                (animation.enemy.y + 25) - animation.tower.y);
    ctx.translate(animation.tower.x, animation.tower.y);
    ctx.rotate(angleInRad);
    ctx.drawImage(animation.currentFrame, -25, 25);
    ctx.rotate(-angleInRad);
    ctx.translate(-animation.tower.x, - animation.tower.y);
  },

  drawTowers(ctx, game, sprites) {
    for (let tile of game.getTowerTiles()) {
      ctx.drawImage(sprites[tile.tower.type].currentFrame, tile.x, tile.y);
    }
  },

  drawTowerRange(ctx, game) {
    if (game.board.currentTileIsABuildTile() && game.board.currentTile.hasTower()) {
      ctx.beginPath();
      ctx.arc(game.board.currentTile.centerX(), game.board.currentTile.centerY(),
              game.board.currentTile.tower.range, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
  },

  simulateTowerRange(ctx, game, hoverTower) {
    if (game.board.currentTileIsAHighlightedBuildTile()) {
      ctx.beginPath();
      ctx.arc(game.board.currentTile.centerX(), game.board.currentTile.centerY(),
              hoverTower.range, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
  },
};

module.exports = CanvasManipulator;
