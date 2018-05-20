(function(){
    angular.module('app').controller('presidentController', presidentController);

    function presidentController (
        $q,
        lodash,
        CarShowService,
        CarCriteriaService,
        UsersService,
        $mdDialog,
        UsersService,
        UserRoleService,
        $state
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            user: null,
            carShow: {
                show_name: null,
                city: null,
                state: null,
                judge_user: null,
                num_of_classes: null,
                userId: null,
            },
            president: {
              showTabs: showTabs,
              hideTabs: hideTabs
            },
            userRole: {
                userId: null,
                roleId: 12
            },
            judge_pass: null,
            manageCarShow: null,
            criteriaList:[],
            newCriteriaList:[],
            changeTab: changeTab,
            createNewShow: createNewShow,
            canSaveNewShow: canSaveNewShow,
            sendToEditShows: sendToEditShows
        });
        var userId;
        function init() {
            UsersService.getUserPromise().then(function(user) {
                $ctrl.user = user;
                $ctrl.carShow.userId = user.id;
                userId=user.id;
            });

        }

        function changeTab(tabIndex){
          $ctrl.selectedIndex=tabIndex;
        }
        //assign form values to array
        var formValues;
        var judgeCriteriaList;
        function getValues(){
          var showName = $ctrl.carShow.show_name;
          var showCity = $ctrl.carShow.city;
          var showState = $ctrl.carShow.state;

          var numOfClasses = $ctrl.carShow.num_of_classes;
          var judgeUserName = $ctrl.carShow.judge_user;
          var judgePassword = $ctrl.judge_pass;
          var date = $ctrl.carShow.date;
          judgeCriteriaList = $ctrl.criteriaList;

          formValues = [showName, showCity, showState, numOfClasses, judgeUserName, judgePassword, date];

        }
        function canSaveNewShow(){
          getValues();
          var save = false;
          formValues.forEach(function(value){
            if(value == null || value == ""){
              save = true;
            }
          });
          return save;
        }
        //add new show to db display message box upson success or failure
        function createNewShow() {
            var ohNo = false;
            CarShowService.saveCarShowPromise($ctrl.carShow).then(function(carShow) {
                $ctrl.carShow = carShow;
                $ctrl.criteriaList = lodash.forEach($ctrl.criteriaList, function(crit) {
                    crit.carShowId = $ctrl.carShow.id;
                })
                var promises = {
                    criteriaList: CarCriteriaService.saveCarCriteriaPromise($ctrl.criteriaList),
                    user: UsersService.createUserPromise({
                        firstname: '',
                        lastname: '',
                        username: $ctrl.carShow.judge_user,
                        password: $ctrl.judge_pass
                    })
                };
                $q.all(promises).then(function(data) {

                   $ctrl.criteriaList = data.criteriaList;
                   $ctrl.carShow = data.carShow;
                   $ctrl.userRole.userId = data.user.id;
                   UserRoleService.createUserRolePromise($ctrl.userRole).then(function(user_role) {
                       displayDialogBox('success');
                       $state.go('app.success');
                       //reroute to manage shows.
                       $ctrl.selectedIndexMain=1;
                   }, function(error) {
                       console.log(error);
                   });
                }, function(error) {
                    console.error(error);
                    ohNo = true;
                    displayDialogBox(error);
                    $ctrl.selectedIndex=0;
                });
            }, function(error) {
                console.error(error);
                ohNo = true;
                displayDialogBox(error);
                $ctrl.selectedIndex=0;
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
                .textContent('You have successfully added '+formValues[0]+'!')
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
        //try to hide tabs in manage show until a show is clicked
        var doIShow = false;
        function showTabs(){
          return doIShow;
        }

        function hideTabs(){
          doIShow=false;
        }

        function sendToEditShows(items){
          console.log("IN SEND TO EDIT FUNC  ");
          doIShow=true;
          $ctrl.selectedIndexTwo=1;
          //$ctrl.manageCarShow.show_name=items.showName;
        }

    }
})();
