(function(){
    angular.module('app').component('showStatsForm', {
        bindings: {
          customPrint: '='
        },
        controller: showStatsFormController,
        controllerAs: '$ctrl',
        templateUrl: './app/components/showStats/showStatsForm.component.html'
    });
    function showStatsFormController (
        $state,
        $location,
        $scope,
        $anchorScroll,
        JudgedCarInfoService,
        CarShowService,
        $stateParams,
        lodash
    ) {
      //bindings
        var $ctrl = angular.extend(this, {
            $onInit: init,
            results: [],
            resultsSorted: {},
            classes: [],
            customResults: [],
            custom: false,
            result: false,
            classFilter: null,
            lengthFilter: null,
            toggleCustom: toggleCustom,
            showCustom: showCustom,
            toggleResult: toggleResult,
            showResult: showResult,
            goPresident: goPresident,
            goSearch: goSearch,
            goTop: goTop,
            customFilter: customFilter,
            printResultInfo: printResultInfo,
            printCustomResult: printCustomResult,
            carShow: {
              show_name: null,
              date: null,
              city: null,
              state: null
            }
        });

        function init() {
            JudgedCarInfoService.getJudgedCarInfosPromise($stateParams.id).then(function(results) {
                $ctrl.results = results;
                $ctrl.resultsSorted = lodash.groupBy($ctrl.results, 'class');
                $ctrl.classes = lodash.keys($ctrl.resultsSorted);
                console.log($ctrl);

            });
            CarShowService.getCarShowPromise($stateParams.id).then(function(results) {
                $ctrl.carShow=results;
                console.log(results.show_name);

            });
        }

        function customFilter() {
            $ctrl.classFilter=$ctrl.classFilter.toUpperCase();
            $ctrl.customResults = lodash.chain($ctrl.results)
                .filter(function(result) {return result.class === $ctrl.classFilter;})
                .sortBy('car_score')
                .takeRight($ctrl.lengthFilter)
                .reverse()
                .value();
        }

        function toggleCustom(){
            $ctrl.customPrint=false;
            $ctrl.custom = true;
            $ctrl.result = false
        }

        function showCustom(){
            return $ctrl.custom;
        }

        function toggleResult(){
            $ctrl.customPrint=true;
            $ctrl.custom = false;
            $ctrl.result = true
        }

        function showResult(){
            return $ctrl.result;
        }

        //gos to president state
        function goPresident(){
          $state.go('app.president');
        }
        function goSearch(){
          $state.go('app.ownersearch');
        }
        //scroll to top of page
        function goTop(){
          $location.hash('top');
          $anchorScroll();
        }

        function printResultInfo(showClass,index) {
            var listLength = $ctrl.resultsSorted[showClass].length;
            if (listLength <= index) {
                return 'No Car';
            } else {
                var list = $ctrl.resultsSorted[showClass];
                return 'Car: ' +
                    list[index].car_number + '->' +
                    list[index].full_name + '(' +
                    list[index].city + ', ' +
                    list[index].state + ')' +
                    list[index].year + ' ' +
                    list[index].make + ' ' +
                    list[index].model + ' Score: '+
                    list[index].car_score;
            }
        }

        function printCustomResult(result) {
            return 'Car: ' +
            result.car_number + '->' +
            result.full_name + '(' +
            result.city + ', ' +
            result.state + ')' +
            result.year + ' ' +
            result.make + ' ' +
            result.model + ' Score: '+
            result.car_score;

        }


    }
})();
