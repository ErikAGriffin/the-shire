(function() {

    'use strict';

    angular
        .module('theShire', ['ui.router','md-core'])
        .config(config)
        .run(bootstrap);

    /* @ngInject */
    function config(URLS,$httpProvider,$urlRouterProvider,$locationProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // $stateProvider
        //     .state('stateName', {
        //         url:'/',
        //         controller:'Controller as ctrl',
        //         templateUrl: '/views/partials/template.html'
        //     });
        $urlRouterProvider.otherwise(URLS.base);
        $locationProvider.html5Mode(true);
    }

    /* @ngInject */
    function bootstrap($rootScope) {

        $rootScope.currentState = "not-loaded";

        // ::..:: UI-Router Event Handlers ::..::

        //   ..:: State Change Start ::..
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            // console.log('state change start from '+fromState.name+' to '+toState.name);
            $state.previous = fromState;
            if (angular.isDefined(toState.name)) {
                // Set the currentState id to the parent of the present state
                $rootScope.currentState = toState.name.split('.').shift();
            }
            else {$rootScope.currentState = "not-loaded";}
        });

        //   ..:: State Change Success ..::
        // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ });

        //   ..:: State Not Found ::..
        // $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){ });

        //   ..:: State Change Error ::..
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            // Not sure if I want this, but I guess it makes sense.
            event.preventDefault();
            console.error("!!~~ $stateChangeError. ~~!!");
            console.log('..from '+fromState.name+' to '+toState.name);
            console.log(error);
            // !!-- this needs to be an error state.. or have much more
            // intelligent handling of specific errors
            $state.go(fromState);
        });

        //   ..:: View Content Loading ::..
        // $rootScope.$on('$viewContentLoading', function(event, viewConfig){ viewConfig.targetView });

        //   ..:: View Content Loaded ::..
        // $scope.$on('$viewContentLoaded',function(event){ });

    }

})();
