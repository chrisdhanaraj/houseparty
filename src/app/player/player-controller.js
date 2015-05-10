angular.module('player', [
  'player.winloss'
])
  .controller('PlayerCtrl', function(stats, history, player) {
    var self = this;

    // utility functions

    var kda = function(matches) {
      var kills, deaths, assists;

      var totalKills = _.sum(matches, function(n) {
        return parseInt(n['participants'][0]['stats']['kills']);
      });

      var totalDeaths = _.sum(matches, function(n) {
        return parseInt(n['participants'][0]['stats']['deaths']);
      });

      var totalAssists = _.sum(matches, function(n) {
        return parseInt(n['participants'][0]['stats']['assists']);
      });



      kills = (totalKills / matches.length).toFixed(2);
      deaths = (totalDeaths / matches.length).toFixed(2);
      assists = (totalAssists / matches.length).toFixed(2);

      return {
        'kills' : kills,
        'deaths' : deaths,
        'assists' : assists
      }
    };

    // bind to controller

    console.log(player);

    var soloStats = stats[0];

    self.name = player.name;
    self.team = player.team;

    self.soloWinsObj = {
      'wins' : soloStats['entries'][0]['wins'],
      'losses' : soloStats['entries'][0]['losses']
    };

    self.kda = kda(history);




  });