(function(){
    angular.module('app').component('judgeCarInfoForm', {
        bindings: {
          carInfo: '=',
          changeTab: '&'
        },
        controller: judgeCarInfoFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/judgeCarInfo/judgeCarInfoForm.component.html'
    });
    function judgeCarInfoFormController (
        $state,
        $location,
        $scope,
        $q
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
            querySearch: querySearch,
            loadAll: loadAll,
            createFilterFor: createFilterFor,
            selectedItemChange: selectedItemChange
        });

        function init() {
        }
        //start of autocomplete


        // list of `state` value/display objects
        $ctrl.makes        = loadAll();
        $ctrl.selectedItem  = null;
        $ctrl.searchText    = null;
        $ctrl.querySearch   = querySearch;

            // ******************************
            // Internal methods
            // ******************************

            /**
             * Search for states... use $timeout to simulate
             * remote dataservice call.
             */
             function querySearch (query) {
               var results = query ? $ctrl.makes.filter( createFilterFor(query) ) : $ctrl.makes;
               return results;
             }


            /**
             * Build `states` list of key/value pairs
             */
            function loadAll() {
              var allMakes = 'Chrysler, DeSoto, Dodge, Eagle, Fargo, Imperial, Jeep,\
                              Plymouth, Ram, SRT, Ford, Continental, Edsel, Lincoln, Mercury, \
                              GMC, Buick, Cadillac, Chevrolet, Pontiac, Oldsmobile, Saturn, AMC';

              return allMakes.split(/, +/g).map( function (state) {
                return {
                  value: state.toLowerCase(),
                  display: state
                };
              });
            }
            //grabs selected item and binds to carinfo make. for autocomplete binding of value
            function selectedItemChange(item){
              $ctrl.carInfo.make = item.display;
            }
            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
              return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
              };

            }


        }
})();
