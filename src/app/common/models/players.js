/* global console, _, angular */

angular.module('common.player', [])
  .factory('PlayerModel', function ($http, $q, config) {
    var riotEndpoints = {
      league: 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/',
      history: 'https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/',
      stats: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'
    };

    var extract = function(result) {
      return result.data;
    };

    var getPlayers = function() {
      return $http.get(config.firebase + '/players.json').then(extract);
    };

    var getPlayerId = function(playerName) {
      return getPlayers().then(function(players){
        var id = _.result(_.find(players.data, function(player) {
          if (player.name === playerName) {
            return player.id;
          }
        }), 'id');

        return id;
      });
    };

    var getAllPlayerStats = function(players){
      var promises = [];

      var ids = _.map(players, function(player) {
        return player.id;
      });

      var firstPerson = ids[0];

      var start = players[firstPerson].lastModified;
      var end = Date.now();

      if (end - start > 600000) {
        ids = _.chunk(ids, 10);
    
        _.forEach(ids, function(idArray) {
          var idString = idArray.toString();
          var playerStatsPromise = $http.get(createLeagueAPIRoute(idString)).then(function(result) {
            _.forEach(result.data, function(playerId, key) {
              $http.put(config.firebase + '/players/' + key + '/lastModified.json', Date.now());

              for (var i = 0; i < playerId.length; i++) {
                $http.put(config.firebase + '/stats/' + key + '/' + i + '.json', playerId[i]);
              }
            });
            return result.data;
          });

          promises.push(playerStatsPromise);
        });

        return $q.all(promises).then(function(res) {
          return _.assign.apply(null, res);
        });
      } else {
        return $http.get(config.firebase + '/stats.json').then(function(results) {
          return results.data;
        });
      }
    };

    var getPlayerStats = function(playerId) {
      return $http.get(config.firebase + '/stats/' + playerId + '.json').then(function(results) {
        return results.data;
      });
    };

    var updatePlayerStats = function(playerId) {
      return $http.get(createLeagueAPIRoute(playerId)).then(function(results) {
        var data = results.data;
        $http.put(config.firebase + '/players/' + playerId + '/lastModified.json', Date.now());
        for (var i = 0; i < data.length; i++) {
          $http.put(config.firebase + '/stats/' + playerId + '/' + i + '.json', data[i]);
        }
        return results.data;
      })
    };

    var getPlayerMatchHistory = function(playerId) {
      var req1 = $http.get(createLeagueHistoryRoute(playerId, 0, 15));
      var req2 = $http.get(createLeagueHistoryRoute(playerId, 16, 31));
      var req3 = $http.get(createLeagueHistoryRoute(playerId, 32, 46));

      return $q.all([req1, req2, req3]).then(function(res) {
        return _.reduce(res, function(mergedSoFar, currentSet) {
          return mergedSoFar.concat(currentSet.data.matches);
        }, []);
      });
    };


    // create league routes
    var createLeagueAPIRoute = function(playerId) {
      return riotEndpoints.league + playerId + '/entry?api_key=' + config.api;
    };

    var createLeagueHistoryRoute = function(playerId, start, stop) {
      return riotEndpoints.history + 
      playerId + 
      '?beginIndex=' +
      start +
      '&endIndex=' +
      stop +
      '&api_key=' +
      config.api;
    };

    var createLeagueStatsRoute = function(playerId) {
      return riotEndpoints.stats + 44686013 + '/ranked?season=SEASON2015&api_key=51bc4ec8-a0a6-427e-8016-d7359a2231b9';
    };

    return {
      getPlayers : getPlayers,
      getPlayerId: getPlayerId,
      getPlayerStats: getPlayerStats,
      getAllPlayerStats : getAllPlayerStats,
      getPlayerMatchHistory : getPlayerMatchHistory,
      updatePlayerStats : updatePlayerStats
    };
  });