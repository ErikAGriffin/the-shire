(function() {

    'use strict';

    require('angular');
    require('angular-ui-router');

    angular
        .module('theShire', ['ui.router','my-module'])
        .config(states)
        .run(bootstrap);

    /* @ngInject */
    function states($stateProvider,$urlRouterProvider,$locationProvider) {
        $stateProvider
            .state('stateName', {
                url:'/',
                controller:'Controller as ctrl',
                templateUrl: '/views/partials/template.html'
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }

    /* @ngInject */
    function bootstrap($rootScope) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.log("!! ---- $stateChangeError. ---- !!");
            console.log(error);
        });
    }

})();
