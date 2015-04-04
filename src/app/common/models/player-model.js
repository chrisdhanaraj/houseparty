'use strict';

angular.module('houseparty.common.player', [])
  .service('PlayerModel', function ($http, $q, config, Riot) {
    var model = this;

    function extract(result) {
      return result.data;
    }
    model.getPlayerId = function(playerName) {
      var deferred = $q.defer();
      $http.get(config.firebase + '/teams.json').then(function(teams){
        _.forEach(teams.data, function(team) {
          _.forEach(team.players, function(player) {
            if (player.name === playerName) {
              deferred.resolve(player.id);
            }
          });
        });
      });

      return deferred.promise;
    };

    model.getMatchHistory = function (playerId) {
      return $http.get(getMatchHistoryUrl(playerId)).then(extract);
    };

    model.getChampData = function() {
      return $http.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json').then(extractRiot);
    };

    model.getChampionData = function(games) {
      return $http.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json').then(function(res) {
        var champs = res.data.data;
        var champArrayId = _.map(games.matches, function(game) {
          return game.participants[0].championId;
	      });

	      var champArrayNames = [];

        _.forEach(champArrayId, function(id) {
          champArrayNames.push(_.findKey(champData, function (champ) {
            return champ.key === id.toString();
          }));
        });

	      return champArrayNames;
      });
    };
  });