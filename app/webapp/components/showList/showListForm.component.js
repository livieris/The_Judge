(function(){
    angular.module('app').component('showListForm', {
        bindings: {
          sendToEditShows: '&',
           user: '<'
        },
        controller: judgeCarScoreFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/showList/showListForm.component.html'
    });
    function judgeCarScoreFormController (
        $state,
        $location,
        $scope,
        CarShowService,
        UsersService,
        $mdDialog
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
            $onChanges: onChanges,
            edit: edit,
            results,
            showList: {
              userId: null
            },
            smallScreenDialogBox: smallScreenDialogBox
        });
        function init() {
          UsersService.getUserPromise().then(function(user) {
              $ctrl.user = user;
              $ctrl.showList.userId = user.id;
          });
        }


        function onChanges() {}

        function edit(show) {
            $state.go('app.editshow', {id: show.id})
        }

        function results(show){
          $state.go('app.judgeresults', {id:show.id});
        }

        function smallScreenDialogBox(ev, item){
            var confirm=$mdDialog.confirm()
              .title("Show options")
              .textContent('')
              .ariaLabel('Show Options')
              .targetEvent(ev)
              .clickOutsideToClose(true)
              .openFrom('#left')
              .ok('EDIT')
              .cancel('RESULTS');
            $mdDialog.show(confirm).then(function(ev){
              edit(item);
            }, function() {
              results(item);
            });
            /*
            $mdDialog.show({
              templateUrl: './app/webapp/components/showList/dialog.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            }).then(function(answer){
              if(answer==edit){
                edit(item);
              }else{
                results(item);
              }
            })
            */
        }

        }
})();
