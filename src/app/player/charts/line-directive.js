angular.module('player.line', [])
  .directive('line', function(){

    var linker = function(scope, element, attrs) {
      scope.$watch('data', function(val) {
        if (val) {
          var data = scope.data;

          var ctx = element.find('canvas')[0].getContext("2d");
          var line = new Chart(ctx).Line(data);

          scope.legend = line.generateLegend();

        }
      });
    };

    var controller = function($scope, $sce) {
      $scope.to_trusted = function(html_code) {
        console.log(html_code);
        return $sce.trustAsHtml(html_code);
      }
    };

    return {
      controller: controller,
      link: linker,
      scope: {
        data:'=data',
      },
      templateUrl: 'app/player/charts/line.tmpl.html'
    }
  })
;