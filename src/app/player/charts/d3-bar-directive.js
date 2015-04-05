angular.module('player.d3', [])
  .directive('bar', function(){
    var linker = function(scope, element, attrs) {
      // var data = attrs.data.split(',').map(Number);
      var data = [12, 16];

      var chart = d3.select(element[0]);

      chart.append("div").attr("class", "chart")
        .selectAll('div')
        .data(data).enter().append("div")
        .transition().ease("elastic")
        .style("height", function(d) { return d * 15; })
        .text(function(d) { return d; });
    };

    return {
      link: linker,
      scope: {
        data:'@data',
      },
      templateUrl: 'app/player/charts/bar.tmpl.html'
    }
  })
;