angular.module('houseparty.common.team', [])
  .service('TeamModel', function ($http, $q, config) {
    var model = this,
        teams;

    var extract = function(result) {
      return result.data;
    };

    model.getPlayers = function() {
      return $http.get(config.firebase + '/players.json').then(extract);
    };

    model.getTeamData = function() {
      return $http.get(config.firebase + '/teams.json').then(extract);
    };
  });