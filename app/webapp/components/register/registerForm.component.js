(function(){
    angular.module('app').component('registerForm', {
        bindings: {},
        controller: registerFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/register/registerForm.component.html'
    });
    function registerFormController (
        $state,
        $scope,
        $location,
        LoginService,
        UserRoleService
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            $postLink: viewLoaded,
            user: {
                firstname: null,
                lastname: null,
                username: null,
                password: null
            },
            userRole: {
                userId: null,
                roleId: 1
            },
            confirmPassword: null,
            error: null,
            showPasswordHelp: false,
            register: register,
            passwordsMatch: passwordsMatch,
            showConfirmPassword: showConfirmPassword
        });

        function init() {
            $ctrl.passwordRegex = '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$';
            $ctrl.passwordRequirements = 'Please include at least one uppercase letter, one lowercase letter, one number and one special character (!@#$&*)';
        }

        function viewLoaded() {
            //the postLink lifecycle hook calls after view is loaded, which is when the registerForm is acutally bound to controller
            //that is why this we are adding the custom validation here instead on onInit
            $scope.registerForm.confirmPassword.$setPristine();
            $scope.registerForm.confirmPassword.$setUntouched();
            $scope.registerForm.confirmPassword.$setValidity('mustmatch', false);
        }

        function passwordsMatch() {
            if ($ctrl.user.password === $ctrl.confirmPassword) {
                $scope.registerForm.confirmPassword.$setValidity('mustmatch', true);
            } else {
                $scope.registerForm.confirmPassword.$setValidity('mustmatch', false);
            }
        }

        function showConfirmPassword() {
            if($ctrl.user.password) {
                return true;
            } else {
                return false;
            }
        }

        function register() {
            LoginService.getRegisterPromise($ctrl.user).then(function(response) {
                $ctrl.error = null;
                $ctrl.user = response;
                $ctrl.userRole.userId = $ctrl.user.id;
                UserRoleService.createUserRolePromise($ctrl.userRole).then(function(user_role) {
                    $ctrl.user.roles = [user_role];
                    $state.go('app.president');
                }, function(error) {
                    console.log(error);
                });
            }, function(error){
                $ctrl.error = error.data.message;
            });
        }

        }
})();
