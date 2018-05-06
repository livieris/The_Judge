'use strict';

angular.module('app', [
    'ngMaterial',
    'ngAnimate',
    'ngResource',
    'ngMessages',
    'ngLodash',
    'ui.router',
    'permission', //must be after ui-router
    'permission.ui'//must be after ui-router
])
.config(function(
    $mdThemingProvider,
    $resourceProvider,
    $locationProvider,
    $stateProvider,
    $urlRouterProvider,
    $compileProvider,
    $permissionProvider
) {
    $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('blue');

    //debugging stuff
    $permissionProvider.suppressUndefinedPermissionWarning(true);//turn off for production
    $compileProvider.debugInfoEnabled(true);
    $compileProvider.preAssignBindingsEnabled(true);

    angular.extend($resourceProvider.defaults.actions, {
        update: {
            method: 'PUT'
        },
        findByPage: {
            method: 'GET',
            isArray: true,
            interceptor: {
                response: function (response) {
                    response.resource.$httpHeaders = response.headers;
                    return response.resource;
                }
            }
        },
        saveAll: {
            method: 'POST',
            isArray: true
        }
    });

    $locationProvider.hashPrefix('');//angular starting using #!(hashBangs)which are gross

    /** There is a ui-router bug that forces the workaround below uncomment with ui-router is fixed
    $urlRouterProvider.otherwise('/');
    **/
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('welcome');
    });

    //set app main view containers
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        template: '<ui-view></ui-view>'
    });

    $stateProvider.state('welcome', {
        url: '/',
        templateUrl: './app/views/welcome.html',
        controller: 'welcomeController'
    });

    // Prevent router from automatic state resolving
    $urlRouterProvider.deferIntercept();

})
.run(function (
    $q,
    $injector,
    $urlRouter,
    lodash,
    RoleService,
    PassportService,
    PermPermissionStore,
    PermRoleStore,
    PermissionService
) {
    //load roles and permissions
    var promises = {
      roles: RoleService.getRolesPromise(),
      permissions: PermissionService.getPermissionsPromise()
    }
    $q.all(promises).then(function(data) {

        var permissionsList = lodash.map(data.permissions, 'name');
        PermPermissionStore.defineManyPermissions(permissionsList, function (permissionName) {
          return lodash.contains(permissions, permissionName);
        });

        lodash.forEach(data.roles, function(role) {
            var rolePermissions = lodash.map(role.permissions, 'name');
            PermRoleStore.defineRole(role.name, rolePermissions, function(roleName) {
                PassportService.getAuthenticatedPromise().then(function(user) {
                    if(angular.isDefined(user.id)
                        && angular.isDefined(permissions)
                        && lodash.contains(user.permissions, roleName)) {
                            return true;
                        }
                        return false;
                });
            });
        });

        // kick-off router and start the application rendering
        $urlRouter.sync();
        $urlRouter.listen();

    }, function(error) {
      console.log('Error setting up ng-permissions. API failed to return data.');
    });

});
