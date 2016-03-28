var assert = require('chai').assert;
const SimpleTower = require('../lib/simple-tower.js');

it('tower is a function', function (){
  assert.typeOf(SimpleTower, 'function');
});

describe('tower attributes', function (){

  it('tower has a damage amount', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.damage, 'number');
  });

  it('tower has a range', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.range, 'number');
  });

  it('tower has a fire-rate', function (){
    let tower = new SimpleTower({x: 1, y: 1});
    assert.typeOf(tower.fireRate, 'number');
  });

});
