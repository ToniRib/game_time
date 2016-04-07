var monies = {
  'test': 100,
  1: 260,
  2: 350,
  3: 470,
  4: 200,
  5: 400
};

var GetMonies = function(level) {
  return monies[level];
};

module.exports = GetMonies;
