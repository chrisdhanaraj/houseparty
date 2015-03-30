angular.module('houseparty')
  .controller('PlayerCtrl', function($stateParams, PlayerModel) {
    var ctrl = this;
    ctrl.name = $stateParams.name;

    ctrl.id = PlayerModel.getPlayerId(ctrl.name);

    ctrl.getHistory = function() {
      PlayerModel.getMatchHistory(ctrl.id)
        .then(PlayerModel.getChampionData)
        .then(function(result) {
          ctrl.champions = result;

	  ctrl.createChampionChart();
	});
    };

    ctrl.createChampionChart = function() {
      ctrl.championTendency = {};
      for (var i = 0; i < ctrl.champions.length; i++) {
	var current = ctrl.champions[i];
	ctrl.championTendency[current] = ctrl.championTendency[current] ? ctrl.championTendency[current] + 1 : 1;
      }
    };

    ctrl.getHistory();
  });