angular.module('player.winloss', [])
  .controller('WinLossCtrl', function(getId, solostats) {
    var subctrl = this;
    var stats = solostats[getId][0]['entries'][0];

    subctrl.wins = stats.wins;
    subctrl.losses = stats.losses;

    subctrl.data = {
      labels: ["Wins", "Losses"],
      datasets: [
        {
          label: "Wins",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,0.5)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [stats.wins, stats.losses]
        }
      ]
    };

  });