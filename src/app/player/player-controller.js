angular.module('player', [
  'player.winloss'
])
  .controller('PlayerCtrl', function(stats, history) {
    var self = this;

    var soloStats = stats[0];

    self.soloWinsObj = {
      'wins' : soloStats['entries'][0]['wins'],
      'losses' : soloStats['entries'][0]['losses']
    };

    console.log(stats, history);

  });