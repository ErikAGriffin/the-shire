(function() {

    'use strict';

    angular
        .module('my-module')
        .service('the-shirehttpService', service);

    /* @ngInject */
    function service($http,$q) {
        /* jshint validthis: true */
        var self = this;

        self.post = post;

        function post(path, body, options) {
            return ($http.post(path, body)
            .then(success,failure));
        }

        function success(response) {
            // what to do in case of a 204?
            return response.data;
        }
        // not actually sure what $q's purpose here is
        // Need to implement a logger.
        function failure(response) {
            console.log(response.status+' -- error');
            console.log(response);
            return $q.reject(response);
        }

    }

})();
