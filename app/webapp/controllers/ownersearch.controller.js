(function(){
    angular.module('app').controller('ownersearchController', ownersearchController);

    function ownersearchController (
      lodash,
      $mdDialog,
      $state,
      $stateParams,
      IndividualScoreservice
    ) {
        var $ctrl = angular.extend(this, {
            $onInit: init,
            goJudgeResults: goJudgeResults,
            ownerInfo: {
              full_name: null
            },
            ownerSearch: ownerSearch,
            displayResults: displayResults
        });

        function init() {

        }

        function goJudgeResults(){
          $state.go('app.judgeresults', {id:$stateParams.id});
        }

        function ownerSearch(){
          $ctrl.ownerInfo.carShowId = $stateParams.id;
          console.log("NAME:  "+$ctrl.ownerInfo.full_name);
          IndividualScoreservice.getIndividualScoresPromise($ctrl.ownerInfo).then(function (results){
            $ctrl.results = results;
            $ctrl.resultsSorted = lodash.groupBy($ctrl.results, 'full_name');
            $ctrl.owners = lodash.keys($ctrl.resultsSorted);

          });
        }

        function displayResults(name){
          var listLength = $ctrl.resultsSorted[name].length;
          if (listLength <= 0) {
              return 'No Criteria';
          } else {
              var list = $ctrl.resultsSorted[name];
              var returnString='';
              for(var i=0; i<listLength; i++){
                returnString+="<h4>"+list[i].criteria + ": "+
                              list[i].score+"</h4>";
              }             /*
              return '' +
                  list[index].criteria + ': ' +
                  list[index].score
                  */
                  return returnString;
          }
        }

    }
})();
