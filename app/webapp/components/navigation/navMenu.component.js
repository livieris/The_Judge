(function(){
    angular.module('app').component('navMenu', {
        bindings: {},
        controller: navMenuController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/navigation/navMenu.component.html'
    });
    function navMenuController (
        $state,
        LoginService
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            error: null,
            user: null
        });

        function init() {
            //// TODO: get user
        }

        function logout() {
            LoginService.getLogoutPromise($ctrl.user).then(function(response) {
                $ctrl.user = null;
                $ctrl.error = null;
                $state.go('welcome');
            }, function(error) {
                $ctrl.error = 'There was an error ending the user session.';
            });
        }


        }
})();
