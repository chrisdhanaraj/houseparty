angular.module('houseparty.common.champion', [])
  .service('ChampionModel', function($http, $q) {
    var champion = this,
        championData;

    var extract = function(result) {
      return result.data;
    };

    var cacheChampionData = function(result){
      championData = extract(result);
      return championData;
    };

    var getChampionStaticData = function() {
      return (championData) ? $q.when(championData) : $http.get(config.firebase + championData).then(cacheChampionData);
    };

    champion.convertIdToChampionName = function(id) {
      // better than using $http.cache? hmm
      // maybe for static data

      var deferred = $q.defer();

      function findChampionName() {
        return _.result(_.find(championData, function(champ) {
          return champ.id === id;
        }), 'name');
      }

      if (championData) {
        deferred.resolve(findChampionName());
      } else {
        getChampionStaticData()
          .then(function (){
            deferred.resolve(findChampionName());
          });
      }

      return deferred.promise;
    };


  });