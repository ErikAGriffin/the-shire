(function() {

    'use strict';

    angular
        .module('md-core')
        .factory('mdHttpService', service);

    /* @ngInject */
    function service($http,$q) {

        return {
            get: get,
            post: post
        };

        function get(path,params) {
            params = params || {};
            return ($http.get(path, {params:params})
            .then(success,failure));
        }

        function post(path, body, options) {
            // !!-- Need to get $log
            return ($http.post(path, body)
            .then(success,failure));
        }

        function success(response) {
            // what to do in case of a 204?
            // Is there a way to return multiple
            // things as parameters to the .then(
            // function? eg. .then(function(data,status)
            return response.data;
        }
        // not actually sure what $q's purpose here is
        // Need to implement a logger.
        function failure(response) {
            // Hmm if I begin switching on response codes here...
            // then md-core will need ui.router as a dependency
            // eg. if (status==404) {$state.go(response.data)}
            console.error('..::HTTP ERROR::.. status: '+response.status+' .. '+response.statusText);
            console.log(response);
            return $q.reject(response);
        }

    }

})();
