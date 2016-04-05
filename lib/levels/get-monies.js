var monies = {
  'test': 100,
  1: 250,
  2: 350,
  3: 470
};

var GetMonies = function(level) {
  return monies[level];
};

module.exports = GetMonies;
