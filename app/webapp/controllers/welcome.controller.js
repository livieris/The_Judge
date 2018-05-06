(function(){
    angular.module('app').controller('welcomeController', welcomeController);

    function welcomeController (
        PassportService
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init
        });

        function init() {
            //probably set up a "logged in redirect here"
        }
    }
})();