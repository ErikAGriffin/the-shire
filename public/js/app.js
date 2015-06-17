(function() {
  var app = angular.module('', ['ui.router','ngAnimate']);

  app.config(function($stateProvider,$urlRouterProvider,$locationProvider) {

    // $stateProvider
    //   .state('stateName', {
    //     url:'/',
    //     controller:'Controller as ctrl',
    //     templateUrl: '/views/partials/template.html'
    //   });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });


}());
