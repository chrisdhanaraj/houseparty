angular.module('houseparty.common')
  .service('TeamModel', function ($http, $q) {
    var model = this,
        teams;

    var extract = function(result) {
      return result.data;
    };

    model.getPlayers = function() {
      return $http.get('/app/data/players.json').then(extract);
    };

    model.getTeamData = function() {
      return $http.get('/app/data/teams.json').then(extract);
    };

  });