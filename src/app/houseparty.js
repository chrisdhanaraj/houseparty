angular.module('houseparty', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'houseparty.common',
])
  .constant('config', {
    'firebase' : 'https://house-party-scouter.firebaseio.com',
    'api': '51bc4ec8-a0a6-427e-8016-d7359a2231b9'
  })
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