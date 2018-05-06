(function(){
    angular.module('app').controller('judgesuccessController', judgesuccessController);

    function judgesuccessController (
      $timeout,
      $state
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init
        });

        function init() {
            $timeout(function() {
              $ctrl.selectedIndexMain=1;
              $state.go('app.judge');
            }, 3000);

        }
    }
})();
