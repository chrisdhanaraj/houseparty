angular.module('houseparty.common.champion', [])
  .service('ChampionModel', function($http, config) {
    var champion = this;

    champion.convertIdsToName = function(idArray) {
      return $http.get(config.firebase + '/champions.json')
        .then(function(champions) {
          var champArrayName = [];

          _.forEach(idArray, function(id) {
            champArrayName.push(_.result(_.find(champions.data, function(champ) {
              return champ.id === id;
            }), 'name'));
          });

          return champArrayName;
        });

    };

    champion.convertIdToChampionName = function(id) {
      return $http.get(config.firebase + '/champions.json')
        .then(function(champions) {
          return _.result(_.find(champions.data, function(champ) {
            return champ.id === id;
          }), 'name');
        });
    };
  });