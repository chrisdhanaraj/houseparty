angular.module('main', ['houseparty.common', 'main.team'])
  .controller('MainCtrl', function(TeamModel){
    var main = this;

    var getTeams = function() {
      return TeamModel.getTeamData().then( function(result) {
        main.teams = result;
        return result; // in case we need to chain sometime
      })
    };

    getTeams();

  });