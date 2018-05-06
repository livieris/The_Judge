(function() {
  angular.module('app')
    .factory('PermissionService', PermissionService);

    function PermissionService (
      $resource
    ) {
      var permissionResource = $resource('/api/permissions/:id');

      return {
        getPermissionsPromise: getPermissionsPromise
      }

      function getPermissionsPromise() {
        return permissionResource.query().$promise;
      }
    }

})();
