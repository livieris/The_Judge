(function() {
    angular.module('app')
        .factory('PassportService', PassportService);

        function PassportService($resource, $q) {
            var authenticatedResource = $resource('/api/authenticated');

             return {
                 getAuthenticatedPromise: getAuthenticatedPromise
             }

            function getAuthenticatedPromise() {
                return authenticatedResource.get().$promise;
            }

        }
})();
