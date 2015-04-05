angular.module('player.d3', [])
  .directive('bar', function(){

    var linker = function(scope, element, attrs) {
      var data = scope.data;

      var ctx = element.find('canvas')[0].getContext("2d");
      var bar = new Chart(ctx).Bar(data);

      bar.datasets[0].bars[0].fillColor = "green";
      bar.datasets[0].bars[0].highlightFill = "green";
      bar.datasets[0].bars[0]._saved.fillColor = "green";
      bar.datasets[0].bars[0]._saved.highlightFill = "green";

      bar.datasets[0].bars[1].fillColor = "#7D0A0A";
      bar.datasets[0].bars[1].highlightFill = "#7D0A0A";
      bar.datasets[0].bars[1]._saved.fillColor = "#7D0A0A";
      bar.datasets[0].bars[1]._saved.highlightFill = "#7D0A0A";

    };

    return {
      link: linker,
      scope: {
        data:'=data',
      },
      templateUrl: 'app/player/charts/bar.tmpl.html'
    }
  })
;