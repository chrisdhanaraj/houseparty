angular.module('main', ['common.player'])
  .controller('MainCtrl', function(PlayerModel) {
    var self = this;
    var playerModel = PlayerModel;

    var createLadder = function(players, stats) {
      var tierWeight = 
        {
          'BRONZE' : 0,
          'SILVER' : 505,
          'GOLD' : 1005,
          'PLATINUM' : 1505,
          'DIAMOND' : 2005,
          'MASTER' : 2505,
          'CHALLENGER' : 3005
        };

      var divisionWeight = {
        'V' : 0,
        'IV' : 101,
        'III' : 202,
        'II' : 303,
        'I' : 404
      };

      var ids = _.map(players, function(player) {
        return player.id;
      });

      var ladder = _.map(ids, function(id) {
        var rank; 

        var playerObj = players[id];
        var statsObj = stats[id];

        var tier = statsObj[0].tier;
        var division = statsObj[0].entries[0].division;
        var lp = statsObj[0].entries[0].leaguePoints;
        var weighted = tierWeight[tier] + divisionWeight[division] + lp;

        return {
          'id': id,
          'name' : playerObj.name,
          'weightedRank' : weighted,
          'tier' : statsObj[0].tier,
          'division' : division,
          'lp' : statsObj[0].entries[0].leaguePoints
        };
      });

      ladder.sort(function(a,b) {
        return b.weightedRank - a.weightedRank;
      });

      return ladder;

    };


    playerModel.getPlayers().then(function(players) {
      self.players = players;
      playerModel.getAllPlayerStats(players).then(function(stats) {
        self.ladder = createLadder(players, stats);
      });
    });
  });