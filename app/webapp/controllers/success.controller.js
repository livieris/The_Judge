(function(){
    angular.module('app').controller('successController', successController);

    function successController (
      $timeout,
      $state
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init
        });

        function init() {
            $timeout(function() {
              $ctrl.selectedIndexMain=1;
              $state.go('app.president');
            }, 3000);

        }
    }
})();
