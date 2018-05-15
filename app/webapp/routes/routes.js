(function(){
    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app.home', {
            url: '/home',
            templateUrl: './app/views/home.html',
            controller: 'homeController as $ctrl',
            data: {
              roles: {
                only: ['ADMIN','USER'],
                redirectTo: 'welcome'
              }
            }
        });
      $stateProvider.state('app.judge', {
            url: '/judge',
            templateUrl: './app/views/judge.html',
            controller: 'judgeController as $ctrl',
            data: {
              roles: {
                only: ['USER'],
                redirectTo: 'welcome'
              }
            }
        });
        $stateProvider.state('app.president', {
            url: '/president',
            templateUrl: './app/views/president.html',
            controller: 'presidentController as $ctrl',
            data: {
              roles: {
                only: ['ADMIN'],
                redirectTo: 'welcome'
              }
            }
        });
        $stateProvider.state('app.success', {
            url: '/success',
            templateUrl: './app/views/success.html',
            controller: 'successController as $ctrl',
            data: {
              roles: {
                only: ['ADMIN','USER'],
                redirectTo: 'welcome'
              }
            }
        });
        $stateProvider.state('app.judgesuccess', {
            url: '/judgesuccess',
            templateUrl: './app/views/judgesuccess.html',
            controller: 'judgesuccessController as $ctrl',
            data: {
              roles: {
                only: ['USER'],
                redirectTo: 'welcome'
              }
            }
        });
        $stateProvider.state('app.editshow', {
            url: '/editshow/:id',
            templateUrl: './app/views/editshow.html',
            controller: 'editshowController as $ctrl',
            data: {
              roles: {
                only: ['ADMIN'],
                redirectTo: 'welcome'
              }
            },
            resolve: {
                carShow: function($stateParams, CarShowService) {
                    return CarShowService.getCarShowPromise($stateParams.id);
                }
            }
        });
        $stateProvider.state('app.judgeresults', {
            url: '/judgeresults/:id',
            templateUrl: './app/views/judgeresults.html',
            controller: 'judgeresultsController as $ctrl',
            data: {
              roles: {
                only: ['ADMIN'],
                redirectTo: 'welcome'
              }
          }
        });
        $stateProvider.state('app.ownersearch', {
            url: '/ownersearch/:id',
            templateUrl: './app/views/ownersearch.html',
            controller: 'ownersearchController as $ctrl',
            data: {
              roles: {
                only: ['ADMIN'],
                redirectTo: 'welcome'
              }
          }
        });
    });
})();
