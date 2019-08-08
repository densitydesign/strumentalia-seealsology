// Graphology & Sigma
var randomLayout = require('graphology-layout/random');
window.graphlayout = {
  random: randomLayout
};
window.ForceAtlas2Layout = require('graphology-layout-forceatlas2/worker');
window.Graph = require('graphology');
window.gexf = require('graphology-gexf');
window.Sigma = require('sigma');
