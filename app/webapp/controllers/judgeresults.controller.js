(function(){
    angular.module('app').controller('judgeresultsController', judgeresultsController);

    function judgeresultsController (
      lodash,
      $mdDialog,
      $state,
      $stateParams,
      JudgedCarInfoService
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            carShow: null,
            manageCarShow: null,
            newCriteriaList:[],
            goPresident: goPresident,
            goPrint: goPrint,
            customPrint: false
        });

        function init() {
            JudgedCarInfoService.getJudgedCarInfosPromise($stateParams.id).then(function(results) {
                $ctrl.results = results;
                $ctrl.resultsSorted = lodash.groupBy($ctrl.results, 'class');
                $ctrl.classes = lodash.keys($ctrl.resultsSorted);
                console.log($ctrl);

            });
        }

        function goPresident(){
          $state.go('app.president');
        }
        //print out list
        function goPrint(){
          console.log("PRINT:  "+$ctrl.customPrint);
          if($ctrl.customPrint!=false){
            var content = document.getElementById('mytext').innerHTML;
            var winPopUp = window.open('', '_blank', 'width=500,height=500');
            winPopUp.document.open();
            winPopUp.document.write('<html><head><link rel="stylesheet" type="text/css" href="" /></head><body onload="window.print()">' + content + '</body></html>');
            winPopUp.document.close();
          }else{
            var content = document.getElementById('mytextcustom').innerHTML;
            var winPopUp = window.open('', '_blank', 'width=500,height=500');
            winPopUp.document.open();
            winPopUp.document.write('<html><head><link rel="stylesheet" type="text/css" href="" /></head><body onload="window.print()">' + content + '</body></html>');
            winPopUp.document.close();
          }
        }

    }
})();
