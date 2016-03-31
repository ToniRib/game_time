var GetMonies = function(level) {
  return monies[level];
};

var monies = {
  'test': 100,
  1: 200,
  2: 300
};

module.exports = GetMonies;
