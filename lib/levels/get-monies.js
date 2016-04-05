var monies = {
  'test': 100,
  1: 250,
  2: 350
};

var GetMonies = function(level) {
  return monies[level];
};

module.exports = GetMonies;
