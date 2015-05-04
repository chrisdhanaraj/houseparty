angular.module('houseparty', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'common',
  'main',
  'player'
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
      .state('teams', {
        url: '/teams',
        templateUrl: 'app/teams/team.tmpl.html',
        controller: 'TeamCtrl',
        controllerAs: 'ctrl'
      })
      .state('players', {
        url: '/players/:id',
        templateUrl: 'app/player/player.tmpl.html',
        controller: 'PlayerCtrl',
        controllerAs: 'ctrl',
        resolve: {
          player: function($stateParams, PlayerModel) {
            var id = $stateParams.id;
            var ref = PlayerModel;

            return ref.getBasicPlayerData(id);
          },
          stats: function($stateParams, PlayerModel) {
            var id = $stateParams.id;
            var ref = PlayerModel;

            return ref.getPlayerStats(id);
          },
          history: function($stateParams, PlayerModel) {
            var id = $stateParams.id;
            var ref = PlayerModel;

            return ref.getPlayerMatchHistory(id);
          }
        }
      });
  });