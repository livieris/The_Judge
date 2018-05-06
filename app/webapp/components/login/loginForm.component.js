 (function(){
    angular.module('app').component('loginForm', {
        bindings: {},
        controller: loginFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/login/loginForm.component.html'
    });
    function loginFormController (
        $state,
        $location,
        LoginService,
        UsersService,
        lodash
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            user: {
                username: null,
                password: null
            },
            error: null,
            login: login
        });

        function init() {
        }

        function login() {
            LoginService.getLoginPromise($ctrl.user).then(function(response) {
                $ctrl.error = null;
                UsersService.getUserPromise().then(function(user) {
                    if(lodash.find(user.roles, function(o) { return o.name === 'ADMIN'; }) === undefined) {
                        $state.go('app.judge');
                    } else {
                        $state.go('app.president');
                    }
                });

            }, function(error){
                $ctrl.error = 'There was a problem with that username/password. Please try again or contact support.';
            });
        }

        }
})();
