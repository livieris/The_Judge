(function(){
    angular.module('app').component('criteriaSetupForm', {
        bindings: {
          createNewShow: '&',
          canSaveNewShow: '&',
          criteriaList: '='
        },
        controller: judgeCarScoreFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/criteriaSetup/criteriaSetupForm.component.html'
    });
    function judgeCarScoreFormController (
        $state,
        $location,
        $scope
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
            /*show_name: $ctrl.carShow.name,*/
            addEmptyCriteria: addEmptyCriteria
        });

        function init() {
          console.log("INIT: ");
          addEmptyCriteria();
        }

        function addEmptyCriteria(){
          $ctrl.criteriaList.push({
            criteria: null,
            show_name: null
          });
        }

        }
})();
