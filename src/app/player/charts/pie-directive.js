angular.module('player.pie', [])
  .directive('pie', function(){

    var linker = function(scope, element, attrs) {
      scope.$watch('data', function(val) {
        if (val) {
          var data = scope.data;

          var ctx = element.find('canvas')[0].getContext("2d");
          var doughnut = new Chart(ctx).Doughnut(data);
        }

      });

    };

    return {
      link: linker,
      scope: {
        data:'=data',
      },
      templateUrl: 'app/player/charts/pie.tmpl.html'
    }
  })
;