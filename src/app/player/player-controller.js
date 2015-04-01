angular.module('player', ['houseparty.common.player'])
  .controller('PlayerCtrl', function($stateParams, PlayerModel) {
    var ctrl = this;
    ctrl.name = $stateParams.name;

    var getPlayerId = function(name) {
      return PlayerModel.getPlayerId(name).then(function(id) {
	ctrl.id = id;
	return id;
      });
    };

    var getRecentMatchHistory = function(playerId) {
      return PlayerModel.getMatchHistory(playerId).then(function(history) {
	ctrl.history = history.matches;
	return history.matches;
      })
    };


    getPlayerId(ctrl.name)
      .then(getRecentMatchHistory);

    //var getRecentChampTendences = function(matches) {
    //
    //};

    //ctrl.createChampionChart = function() {
    //  ctrl.championTendency = {};
    //  for (var i = 0; i < ctrl.champions.length; i++) {
    //    var current = ctrl.champions[i];
    //    ctrl.championTendency[current] = ctrl.championTendency[current] ? ctrl.championTendency[current] + 1 : 1;
    //  }
    //};

  });