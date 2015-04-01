angular.module('houseparty.common')
  .service('TeamModel', function ($http, $q) {
    var model = this,
        teams;

    var extract = function(result) {
      return result.data;
    };

    model.getPlayers = function() {
      return $http.get('https://house-party-scouter.firebaseio.com/players.json').then(extract);
    };

    model.getTeamData = function() {
      return $http.get('https://house-party-scouter.firebaseio.com/teams.json').then(extract);
    };

  });