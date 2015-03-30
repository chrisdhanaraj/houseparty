'use strict';

angular.module('houseparty.common')
  .service('PlayerModel', function ($http, $q, config) {
    var service = this;

    service.teams = [
      {
        'name' : 'ACME',
        'players': [
          {
            'name': 'Malkethos',
            'role' : 'Top',
            'bench': false,
            'id' : 19538337
          },
          {
            'name': 'Czark',
            'role': 'Jungle',
            'bench': false,
            'id': 38585037
          },
          {
            'name': 'Phat Syrogity',
            'role': 'Mid',
            'bench': false,
            'id': 37009645
          },
          {
            'name': 'Mobghost',
            'role': 'Support',
            'bench': false,
            'id': 20886507
          },
          {
            'name': 'Jonthegreatest',
            'role': 'AD Carry',
            'bench': false,
            'id': 21381367
          },
          {
            'name': 'Jeret',
            'role': 'Jungle',
            'bench': true,
            'id': 20226438
          },
          {
            'name': 'bigbo0ty',
            'role' : 'Support',
            'bench': true,
            'id': 47027316
          }
        ]
      }
    ];

    function extract(result) {
      return result.data;
    }

    function extractRiot(result) {
      return result.data.data;
    }

    function getMatchHistoryUrl(playerId) {
      return 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + playerId + '?rankedQueues=RANKED_SOLO_5x5,RANKED_TEAM_5x5&api_key=' + config.api;
    }

    service.getPlayerId = function(playerName) {
      var id = '';

      _.forEach(service.teams, function(team) {
        _.forEach(team.players, function(player) {
          if (player.name === playerName) {
            id = player.id;
          }
        });
      });

      return id;
    };

    service.getMatchHistory = function (playerId) {
      return $http.get(getMatchHistoryUrl(playerId)).then(extract);
    };

    service.getChampData = function() {
      return $http.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json').then(extractRiot);
    };

    service.getChampionData = function(games) {
      var deferred = $q.defer();

      $http.get('http://ddragon.leagueoflegends.com/cdn/5.2.1/data/en_US/champion.json')
        .success(function(data) {
          var champData = data.data;
          var champArrayId = _.map(games.matches, function(game) {
            return game.participants[0].championId;
          });
          var champArrayNames = [];

          _.forEach(champArrayId, function(id) {
            champArrayNames.push(_.findKey(champData, function (champ) {
              return champ.key === id.toString();
            }));
          });

          deferred.resolve(champArrayNames.reverse());
        });

      return deferred.promise;
    };
  });