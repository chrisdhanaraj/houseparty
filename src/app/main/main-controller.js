angular.module('houseparty')
  .controller('MainCtrl', function(PlayerModel){
    var main = this;
    main.teams = PlayerModel.teams;
  });