(function() {
    angular.module('app')
        .factory('UsersService', UsersService);

            function UsersService (
              $resource
            ) {
                var usersResource = $resource('/api/users/:username');
                var userResource = $resource('/api/user/:id');

                return {
                    getUsersPromise: getUsersPromise,
                    getUserPromise: getUserPromise,
                    createUserPromise: createUserPromise,
                    deleteUserPromise: deleteUserPromise
                };

                function getUsersPromise(user) {
                    return usersResource.get({username:user}).$promise;
                }

                function getUserPromise() {
                    return userResource.get().$promise;
                }

                function createUserPromise(user) {
                    return userResource.save(user).$promise;
                }

                function deleteUserPromise(userId) {
                    return userResource.delete({id:userId}).$promise;
                }


            }
})();
