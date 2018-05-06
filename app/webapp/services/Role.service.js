(function() {
  angular.module('app')
    .factory('RoleService',RoleService);

    function RoleService (
      $resource
    ) {
      var roleResource = $resource('/api/roles/:id');

      return {
          getRolesPromise: getRolesPromise
      };

      function getRolesPromise() {
        return roleResource.query().$promise;
      }

    }
})();
