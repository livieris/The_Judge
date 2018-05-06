(function(){
    angular.module('app').controller('editshowController', editshowController);

    function editshowController (
      $q,
      lodash,
      CarShowService,
      CarCriteriaService,
      LoginService,
      $mdDialog,
      $state,
      $stateParams,
      carShow,
      UsersService,
      UserRoleService,
      $state,
      $scope
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            manageCarShow: null,
            carShow:{
              judge_user: null,
              car_criteria: []
            },
            judge_pass: null,
            newCriteriaList:[],
            goPresident: goPresident,
            update: update,
            error: null,
            passwordErr: '',
            checkUsername: checkUsername,
            addEmptyCriteria: addEmptyCriteria
        });

        function init() {
            CarShowService.getCarShowPromise($stateParams.id).then(function(show) {
                $ctrl.carShow = show;
                $ctrl.carShow.num_of_classes=parseInt($ctrl.carShow.num_of_classes);
                UsersService.getUsersPromise($ctrl.carShow.judge_user).then(function(existing) {
                    $ctrl.existingJudge = existing;
                });
            });
            $ctrl.passwordRegex = '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$';
            $ctrl.passwordRequirements = 'Please include at least one uppercase letter, one lowercase letter, one number and one special character (!@#$&*)';
        }

        function update() {
            if(testPass()) {
                CarShowService.updateCarShowPromise($ctrl.carShow).then(function(show) {
                    $ctrl.carshow = show;
                    angular.forEach($ctrl.carShow.car_criteria, function(crit) {
                        CarCriteriaService.updateCarCriteriaPromise(crit).then(function(saved) {
                            crit = saved;
                        });
                    });
                    $ctrl.newCriteriaList = lodash.forEach($ctrl.newCriteriaList, function(crit) {
                        crit.carShowId = $ctrl.carShow.id;
                    });
                    CarCriteriaService.saveCarCriteriaPromise($ctrl.newCriteriaList).then(function(cr){

                    });
                    if($ctrl.judge_pass !== null) {
                        UsersService.deleteUserPromise($ctrl.existingJudge.id).then(function() {
                            UsersService.createUserPromise({
                                firstname: '',
                                lastname: '',
                                username: $ctrl.carShow.judge_user,
                                password: $ctrl.judge_pass
                            }).then(function(newJudgeUser) {
                                UserRoleService.createUserRolePromise({roleId:2, userId: newJudgeUser.id}).then(function(user_role) {
                                    displayDialogBox('success');
                                    $state.go('app.success');
                                });
                            })
                        })

                    }
                });
            }
        }

        function testPass() {
            if($ctrl.judge_pass !== null) {
                if($ctrl.judge_pass.length > 7 &&
                    $ctrl.judge_pass.length <31 ) {
                        $ctrl.passwordErr = '';
                        return true;
                    } else {
                        $ctrl.passwordErr = "Must be between 8-30 chars";
                        return false;
                    }
            } else {
                return true;
            }

        }

        function checkUsername() {
          console.log("IN CHECK USER");
            UsersService.getUsersPromise($ctrl.carShow.judge_user).then(function(response) {
                $ctrl.error = null;
                if(response.username==null){
                  $scope.editshow.user_name.$setValidity('usernameInvalid', true);
                }else{
                  $scope.editshow.user_name.$setValidity('usernameInvalid', false);
                }
            }, function(error){
              console.log("ERROR");
                $scope.editshow.user_name.$setValidity('usernameInvalid', false);
            });
        }

        function goPresident(){
          $state.go('app.president');
        }

        function addEmptyCriteria(){
          $ctrl.newCriteriaList.push({
            criteria: null,
            show_name: null
          });
        }

        //speaks for itself
        function displayDialogBox(error){
          if(error == 'success'){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Success!')
                .textContent('You have successfully updated: '+ $ctrl.carShow.show_name +'!')
                .ok('COOL!')
            );
          }else{
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Dun Dun Duun!')
                .textContent('Bummer, something went wrong, try again.')
                .ok('OK')
            );
          }
        }
    }
})();
