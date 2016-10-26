(function() {

    'use strict';

    angular
        .module('md-core')
        .factory('mdBlur',service);

    /* @ngInject */
    function service($timeout,$window) {

        return function(elementId) {
            $timeout(function() {
                var element = $window.document.getElementById(elementId);
                if (element) {element.blur();}
            });
        };
    }


}());
