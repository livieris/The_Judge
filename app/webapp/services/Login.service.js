(function() {
    angular.module('app')
        .factory('LoginService', LoginService);

        function LoginService($resource) {
            var loginResource = $resource('/api/login');
            var registerResource = $resource('/api/register');
            var logoutResource = $resource('/api/logout');

            return {
                getLoginPromise: getLoginPromise,
                getRegisterPromise: getRegisterPromise,
                getLogoutPromise: getLogoutPromise
            };

            function getLoginPromise(user) {
                return loginResource.save(user).$promise;
            }

            function getRegisterPromise(user) {
                return registerResource.save(user).$promise;
            }

            function getLogoutPromise(user) {
                return logoutResource.get(user).$promise;
            }

        }
})();
