var assert = require('chai').assert;
const tower = require('../lib/tower.js');

it('tower is a function', function (){
  assert.typeOf(tower, 'function');
});
