angular.module('player', [
  'houseparty.common.player',
  'houseparty.common.team',
  'player.championtendency',
  'player.killstats',
  'player.rolediversity',
  'player.stats10',
  'player.visiondata',
  'player.winloss',
  'player.service',
  'player.d3'
])
  .controller('PlayerCtrl', function($stateParams, getId, solostats, history) {
    var ctrl = this;
    var id = getId;
    ctrl.name = $stateParams.name;
    ctrl.solostat = solostats[id][0]['entries'][0];
    ctrl.history = history;


    //PlayerModel.getPlayerId(ctrl.name)
    //  .then(function(id) { // level 1
    //    //ctrl.id = id;
    //
    //    Riot.getLeague(id)
    //      .then(function(league) {
    //        store.storeSoloStats(league[id][0]['entries'][0]);
    //        console.log('hi from main');
    //        //ctrl.solostats = league[id][0]['entries'][0];
    //      });
    //
    //    Riot.getMatchHistory(id, 10)
    //      .then(function(history) { // level 2
    //        store.storeHistory(history.matches);
    //        ctrl.history = history.matches;
    //      })
    //  });


  });