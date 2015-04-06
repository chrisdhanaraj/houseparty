angular.module('player.championtendency', ['houseparty.common.champion'])
  .controller('ChampionTendencyCtrl', function(history, ChampionModel) {
    var subctrl = this;
    var colorOptions = ['#F7464A', '#46BFBD', '#FDB45C', '#FF8100', '#FF6100', '#0A5A7D', '#7D0A0A', '#217D0A', '#160A7D'];
    var championIds = _.map(history.matches, function(match) {
      return match['participants'][0]['championId'];
    });

    ChampionModel.convertIdsToName(championIds).then(function(names) {
      subctrl.championNames = names;

      var counter = 0;
      var data = [];

      var countChamps = _.countBy(names, function(name) {
        return name;
      });

      subctrl.champs = countChamps;

      _.forEach(countChamps, function(count, champ) {
        data.push({
          value: count,
          color: colorOptions[counter],
          highlight: colorOptions[counter],
          label: champ
        });

        counter++;
      });

      subctrl.data = data;

    });
  });