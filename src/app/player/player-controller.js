angular.module('player', [
  'houseparty.common.player',
  'houseparty.common.team',
  'houseparty.common.champion',
  'player.championtendency',
  'player.killstats',
  'player.rolediversity',
  'player.stats10',
  'player.visiondata',
  'player.winloss',
  'player.d3',
  'player.pie',
  'player.line'
])
  .controller('PlayerCtrl', function($stateParams, getId, solostats, history) {
    var ctrl = this;
    var id = getId;
    ctrl.name = $stateParams.name;
    ctrl.solostat = solostats[id][0]['entries'][0];
    ctrl.history = history;
  });