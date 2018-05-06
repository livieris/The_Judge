(function(){
    angular.module('app').component('createNewJudgeForm', {
        bindings: {
        },
        controller: createNewJudgeFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/createNewJudge/createNewJudgeForm.component.html'
    });
    function createNewJudgeFormController (
        $state,
        $location,
        $scope,
        UsersService
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
            judge: {
              judge_user: null,
              judge_pass: null
            },
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
            $scope.createNewJudgeForm.confirmPassword.$setPristine();
            $scope.createNewJudgeForm.confirmPassword.$setUntouched();
            $scope.createNewJudgeForm.confirmPassword.$setValidity('mustmatch', false);
            $scope.createNewJudgeForm.confirmPassword.$setValidity('usernameInvalid', true);
        }

        function passwordsMatch() {
            if ($ctrl.judge.judge_pass === $ctrl.confirmPassword) {
                $scope.createNewJudgeForm.confirmPassword.$setValidity('mustmatch', true);
            } else {
                $scope.createNewJudgeForm.confirmPassword.$setValidity('mustmatch', false);
            }
        }

        function showConfirmPassword() {
            if($ctrl.judge.judge_pass) {
                return true;
            } else {
                return false;
            }
        }

        function checkUsername() {
          console.log("IN CHECK USER");
            UsersService.getUsersPromise($ctrl.judge.judge_user).then(function(response) {
                $ctrl.error = null;
                $scope.createNewJudgeForm.userName.$setValidity('usernameInvalid', true);
            }, function(error){
              console.log("ERROR");
                $scope.createNewJudgeForm.userName.$setValidity('usernameInvalid', false);
            });
        }

        }
})();
