(function(){
    angular.module('app').component('showInfoForm', {
        bindings: {
          changeTab: '&',
          carShow: '='
        },
        controller: showInfoFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/showInfo/showInfoForm.component.html'
    });
    function showInfoFormController (
        $state,
        $location,
        $scope
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
        });

        function init() {
          console.log("INIT: ");
          console.log($ctrl);
        }

        }
})();
