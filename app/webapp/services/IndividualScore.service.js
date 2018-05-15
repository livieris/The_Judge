(function() {
  angular.module('app')
    .factory('IndividualScoreservice',IndividualScoreservice);

    function IndividualScoreservice (
      $resource,
      lodash
    ) {
      var IndividualScoreResource = $resource('/api/individual_score/:id');
      var IndividualScoreResourceGet = $resource('/api/individual_score/carShowId/:carShowId/full_name/:full_name')

      return {
          getIndividualScoresPromise: getIndividualScoresPromise,
          saveIndividualScorePromise: saveIndividualScorePromise,
          updateIndividualScorePromise: updateIndividualScorePromise,
          deleteIndividualScorePromise: deleteIndividualScorePromise
      };

      function getIndividualScoresPromise(owner) {
        return IndividualScoreResourceGet.query({carShowId: owner.carShowId, full_name: owner.full_name}).$promise;
      }

      function saveIndividualScorePromise(IndividualScore) {
          if (!lodash.isArray(IndividualScore)) {
              IndividualScore = [IndividualScore];
          }
          return IndividualScoreResource.saveAll(IndividualScore).$promise;
      }

      function updateIndividualScorePromise(IndividualScore) {
          return IndividualScoreResource.update({id: IndividualScore.id}, IndividualScore).$promise;
      }

      function deleteIndividualScorePromise(IndividualScore) {
          return IndividualScoreResource.remove({id: IndividualScore.id}, carshow).$promise;
      }

    }
})();
