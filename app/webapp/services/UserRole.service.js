(function() {
  angular.module('app')
    .factory('UserRoleService', UserRoleService);

    function UserRoleService (
      $resource
    ) {
      var userRoleResource = $resource('/api/userrole');

      return {
          createUserRolePromise: createUserRolePromise
      };

      function createUserRolePromise(user_role) {
        return userRoleResource.save(user_role).$promise;
      }

    }
})();
