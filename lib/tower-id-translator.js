const FlashTower = require('./flash-tower');
const SimpleTower = require('./simple-tower');
const HeavyDamageTower = require('./heavy-damage-tower');
const ContinuousFireTower = require('./continuous-fire-tower');

let towerIdTranslator = {
  'simple-tower': new SimpleTower({ x: 0, y:0 }),
  'flash-tower': new FlashTower({ x: 0, y:0 }),
  'heavy-damage-tower': new HeavyDamageTower({ x: 0, y:0 }),
  'continuous-fire-tower': new ContinuousFireTower({ x: 0, y:0 })
};

module.exports = towerIdTranslator;
