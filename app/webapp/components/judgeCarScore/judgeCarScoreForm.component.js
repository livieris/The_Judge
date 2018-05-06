(function(){
    angular.module('app').component('judgeCarScoreForm', {
        bindings: {
            carShow: '<',
            carInfo: '=',
            totalScore: '&',
            save: '&',
            canSave: '&'
        },
        controller: judgeCarScoreFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/judgeCarScore/judgeCarScoreForm.component.html'
    });
    function judgeCarScoreFormController (
        $state,
        $location,
        $scope,
        $stateParams,
        CarShowService,
        UsersService
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
            $onChanges: onChanges

        });

        function init() {
            console.log($ctrl);
        }
        function onChanges() {
            console.log($ctrl);
        }

        }
})();
