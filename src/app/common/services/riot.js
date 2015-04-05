angular.module('houseparty.common.riot', [])
  .service('Riot', function(config, $http) {
    var riot = this;

    // {{ID}}/entry?api_key=config.api
    var endpoints = {
      'league' : 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/',
      'matchhistory' : 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/',
      'championData' : '/champions'
    };

    function extract(result) {
      return result.data;
    }

    var getMatchHistoryUrl = function(id, number) {
      return endpoints.matchhistory + id  + '?rankedQueues=RANKED_SOLO_5x5,RANKED_TEAM_5x5&endIndex=' + number + '&api_key=' + config.api;
    };

    var getLeagueUrl = function(id) {
      return endpoints.league + id + '/entry?api_key=' + config.api;
    };

    riot.getLeague = function(id) {
      return $http.get(getLeagueUrl(id)).then(extract);
    };

    riot.getMatchHistory = function(id, number) {
      return $http.get(getMatchHistoryUrl(id, number)).then(extract);
    };


  });