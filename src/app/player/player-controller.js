angular.module('player', [])
  .controller('PlayerCtrl', function($stateParams, PlayerModel) {
    var self = this;

    var id = $stateParams.id;
    var playerModel = PlayerModel;

    playerModel.getPlayerMatchHistory(id).then(function(result) {
      console.log(result);
    });

  });