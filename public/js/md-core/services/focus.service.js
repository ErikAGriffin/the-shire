(function() {

    'use strict';

    angular
        .module('md-core')
        .factory('mdFocus',service);

    /* @ngInject */
    function service($timeout,$window) {

        return function(elementId) {
            $timeout(function() {
                var element = $window.document.getElementById(elementId);
                if (element) {element.focus();}
            });
        };
    }


}());
