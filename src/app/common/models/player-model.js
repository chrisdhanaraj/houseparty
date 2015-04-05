'use strict';

angular.module('houseparty.common.player', [])
  .service('PlayerModel', function ($http, $q, config, Riot) {
    var model = this;

    function extract(result) {
      return result.data;
    }
    model.getPlayerId = function(playerName) {
      return $http.get(config.firebase + '/players.json').then(function(players){
        //deferred.resolve(player.id);
        var id = _.result(_.find(players.data, function(player) {
          if (player.name === playerName) {
            return player.id;
          }
        }), 'id');

        return id;
      });
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