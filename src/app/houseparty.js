angular.module('houseparty', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'houseparty.common',
  'player',
  'main'
])
  .constant('config', {
    'firebase' : 'https://house-party-scouter.firebaseio.com',
    'api': '51bc4ec8-a0a6-427e-8016-d7359a2231b9'
  })
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.cache = true;
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url:'/',
        templateUrl: 'app/main/main.tmpl.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('player', {
        url:'/player/:name',
        templateUrl: 'app/player/player.tmpl.html',
        controller: 'PlayerCtrl',
        controllerAs: 'ctrl',
        resolve: {
          getId : function($stateParams, PlayerModel) {
            return PlayerModel.getPlayerId($stateParams.name);
          },
          solostats: function(Riot, getId) {
            return Riot.getLeague(getId);
          },
          history: function(Riot, getId) {
            return Riot.getMatchHistory(getId, 15);
          }
        }

      })
      .state('player.championtendency', {
        url:'/championtendency',
        templateUrl: 'app/player/championtendency/championtendency.tmpl.html',
        controller: 'ChampionTendencyCtrl',
        controllerAs: 'subctrl',
      })
      .state('player.killstats', {
        url:'/killstats',
        templateUrl: 'app/player/killstats/killstats.tmpl.html',
        controller: 'KillStatsCtrl',
        controllerAs: 'subctrl',
      })
      .state('player.rolediversity', {
        url:'/rolediversity',
        templateUrl: 'app/player/rolediversity/rolediversity.tmpl.html',
        controller: 'RoleDiversityCtrl',
        controllerAs: 'subctrl',
      })
      .state('player.stats10', {
        url:'/stats10',
        templateUrl: 'app/player/stats10/stats10.tmpl.html',
        controller: 'StatsCtrl',
        controllerAs: 'subctrl',
      })
      .state('player.visiondata', {
        url:'/visiondata',
        templateUrl: 'app/player/visiondata/visiondata.tmpl.html',
        controller: 'VisionDataCtrl',
        controllerAs: 'subctrl',
      })
      .state('player.winloss', {
        url:'/winloss',
        templateUrl: 'app/player/winloss/winloss.tmpl.html',
        controller: 'WinLossCtrl',
        controllerAs: 'subctrl',
      })
      .state('champion', {
        url:'/champion/:name',
        templateUrl: 'app/champion/champion.tmpl.html',
        controller: 'ChampionCtrl',
        controllerAs: 'ctrl',
      })
      .state('game', {
        url:'/game/:id',
        templateUrl: 'app/game/game.tmpl.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      });
  });