angular.module('houseparty')
  .controller('PlayerCtrl', function($stateParams, PlayerModel) {
    var ctrl = this;
    ctrl.name = $stateParams.name;

    ctrl.id = PlayerModel.getPlayerId(ctrl.name);

    ctrl.getHistory = function() {
      PlayerModel.getMatchHistory(ctrl.id)
        .then(PlayerModel.getChampionData)
        .then(function(result) {
          console.log(result);
          ctrl.champions = result;
        })
    };

    ctrl.getHistory();
  });