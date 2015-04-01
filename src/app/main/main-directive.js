angular.module('main.team', [])
  .directive('team', function(TeamModel){
    var teamName;

    var controller = function() {
      var ctrl = this,
          playerArray;

      var getPlayers = function(team) {
        return TeamModel.getPlayers(team).then( function(result) {
          playerArray = result;
          return result;
        });
      };

      var useData = function(players) {
        ctrl.players = _.map(players, function(value) {
          if(value.team === ctrl.teamName) {
            return value.name;
          };
        });
      };

      getPlayers(teamName)
        .then(useData);
    };

    return {
      scope: {
        teamName:'@teamname',
      },
      templateUrl: 'app/main/team.tmpl.html',
      controller: controller,
      controllerAs: 'ctrl',
      bindToController: true
    }
  })
;