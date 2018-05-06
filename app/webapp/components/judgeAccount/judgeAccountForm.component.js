(function(){
    angular.module('app').component('judgeAccountForm', {
        bindings: {
          changeTab: '&',
          carShow: '=',
          judgePass: '='
        },
        controller: judgeAccountFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/judgeAccount/judgeAccountForm.component.html'
    });
    function judgeAccountFormController (
        $state,
        $location,
        $scope,
        UsersService
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
              confirmPassword: null,
              error: null,
              showPasswordHelp: false,
              checkUsername: checkUsername,
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
            $scope.judgeAccountForm.confirmPassword.$setPristine();
            $scope.judgeAccountForm.confirmPassword.$setUntouched();
            $scope.judgeAccountForm.confirmPassword.$setValidity('mustmatch', false);
            $scope.judgeAccountForm.userName.$setPristine();
            $scope.judgeAccountForm.userName.$setUntouched();
            $scope.judgeAccountForm.userName.$setValidity('usernameInvalid', true);
        }

        function passwordsMatch() {
            if ($ctrl.judgePass === $ctrl.confirmPassword) {
                $scope.judgeAccountForm.confirmPassword.$setValidity('mustmatch', true);
            } else {
                $scope.judgeAccountForm.confirmPassword.$setValidity('mustmatch', false);
            }
        }

        function showConfirmPassword() {
            if($ctrl.judgePass) {
                return true;
            } else {
                return false;
            }
        }

        function checkUsername() {
          console.log("IN CHECK USER   "+$ctrl.carShow.judge_user);
            UsersService.getUsersPromise($ctrl.carShow.judge_user).then(function(response) {
                $ctrl.error = null;
                if(response.username==null){
                  $scope.judgeAccountForm.userName.$setValidity('usernameInvalid', true);
                }else{
                  $scope.judgeAccountForm.userName.$setValidity('usernameInvalid', false);
                }
            }, function(error){
              console.log("ERROR");
                $scope.judgeAccountForm.userName.$setValidity('usernameInvalid', false);
            });
        }

        }
})();
