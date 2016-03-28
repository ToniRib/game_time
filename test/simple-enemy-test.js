var assert = require('chai').assert;
const simpleEnemy = require('../lib/simple-enemy.js');

it('simple enemy is a function', function (){
  assert.typeOf(simpleEnemy, 'function');
});
