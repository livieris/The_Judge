(function(){
    angular.module('app').controller('judgeController', judgeController);

    function judgeController (
      $q,
      lodash,
      CarShowService,
      CarCriteriaService,
      UsersService,
      $mdDialog,
      UsersService,
      UserRoleService,
      JudgedCarInfoService,
      $state
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            carInfo: {
              full_name: null,
              car_number: null,
              class: null,
              year: null,
              make: null,
              model: null,
              city: null,
              state: null,
              car_score: null,
              carShowId: null
            },
            user: null,
            save: save,
            canSave: canSave,
            changeTab: changeTab,
            totalScore: totalScore
        });

        function init() {
          UsersService.getUserPromise().then(function(user) {
              $ctrl.user = user;
              CarShowService.getJudgeCarShows($ctrl.user.username).then(function(show){
                 $ctrl.carShow = show;
                $ctrl.carInfo.carShowId=show.id;
              });
          });
        }
        //assign form values to array
        var formValues;
        function getValues(){
          var fullName = $ctrl.carInfo.full_name;
          var carClass = $ctrl.carInfo.class;
          var carNumber = $ctrl.carInfo.car_number;
          var carYear = $ctrl.carInfo.year;
          var carMake = $ctrl.carInfo.make;
          var carModel = $ctrl.carInfo.model;
          var city = $ctrl.carInfo.city;
          var state = $ctrl.carInfo.state;
          formValues = [fullName, carClass, carNumber, carYear, carMake, carModel, city, state];

        }
        //save new owner to db
        function save(){
          console.log("IN save:  "+$ctrl.carInfo.carShowId);
          var ohNo = false;
          var capClass = $ctrl.carInfo.class;
          $ctrl.carInfo.class=capClass.toUpperCase();
          JudgedCarInfoService.saveJudgedCarInfoPromise($ctrl.carInfo).then(function(carInfo) {
              $ctrl.carInfo = carInfo;
              displayDialogBox('success');
              $state.go('app.judgesuccess');
          }, function(error) {
              console.error(error);
              ohNo = true;
              displayDialogBox(error);
              $ctrl.selectedIndex=0;
          });
        }

        //check all form input values if empty, don't allow a save/push to db is empty
        function canSave(){
          getValues();
          var save = false;
          formValues.forEach(function(value){
            if(value == null || value == ""){
              save = true;
            }
          });
          if(save==false){
            save = isCriteriaFilled();
          }
          return save;
        }

        function isCriteriaFilled(){
          var save = false;
          lodash.forEach($ctrl.carShow.car_criteria, function(crit) {
            if(crit.value==null){
              save = true;
            }
          });
          return save;
        }

        //speaks for itself
        function displayDialogBox(error){
          if(error == 'success'){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Success!')
                .textContent('You have successfully added '+$ctrl.carInfo.full_name+'!')
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

        function totalScore(){
          console.log("TOTAL SCORE");
          var total=0;
          lodash.forEach($ctrl.carShow.car_criteria, function(crit) {
            if(crit.value!=null){
              total+=crit.value;
            }
          });
          $ctrl.carInfo.car_score = total;
        }

        function changeTab(tabIndex){
          console.log("IN CHANGE TAB:  "+$ctrl.selectedIndex);
          $ctrl.selectedIndex=tabIndex;
        }

    }
})();
