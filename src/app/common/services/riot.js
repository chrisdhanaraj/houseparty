angular.module('houseparty.common.riot', [])
  .service('Riot', function(config) {
    var riot = this;

    // {{ID}}/entry?api_key=config.api
    var endpoints = {
      'league' : 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/',
      'matchhistory' : 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/',
      'championData' : '/champions'
    };
    var championData;

    var getMatchHistoryUrl = function(id) {
      return endpoints.matchhistory + id  + '?rankedQueues=RANKED_SOLO_5x5,RANKED_TEAM_5x5&api_key=' + config.api;
    };

    var getLeagueUrl = function(id) {
      return endpoints.league + id + '/entry?api_key=' + config.api;
    };
  });