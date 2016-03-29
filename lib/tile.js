var Tile = function (type, position) {
  this.buildSite = type.isBuildSite;
  this.vacant = true;
  this.x = position.x;
  this.y = position.y;
};

//
// if (this.buildSite && this.vacant) {
//   // add tower
// } else if (this.BuildSite) {
//   // display radius
// }

module.exports = Tile;
