angular.module('player.service', [])
  .factory('PlayerData', function(config, $http) {
    var data = {
      solostats: {},
      history: {}
    };

    var storeSoloStats = function(data) {
      console.log('hi');
      data.solostats = data;
      console.log('data', data);
    };

    var getSoloStats = function(){
      return data.solostats;
    };

    var storeHistory = function(data) {
      data.history = data;
    };

    var getHistory = function() {
      return data.history;
    };

    return {
      storeSoloStats: storeSoloStats,
      getSoloStats: getSoloStats,
      storeHistory: storeHistory,
      getHistory: getHistory
    }

  });