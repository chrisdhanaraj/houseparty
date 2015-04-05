angular.module('player.winloss', [])
  .controller('WinLossCtrl', function(getId, solostats) {
    var subctrl = this;
    var stats = solostats[getId][0]['entries'][0];

    subctrl.data = stats.wins + ',' + stats.losses;
  });