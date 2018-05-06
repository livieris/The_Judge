(function() {
  angular.module('app')
    .factory('JudgedCarInfoService',JudgedCarInfoService);

    function JudgedCarInfoService (
      $resource
    ) {
      var judgedCarInfoResource = $resource('/api/judged_car_info/:id');

      return {
          getJudgedCarInfosPromise: getJudgedCarInfosPromise,
          saveJudgedCarInfoPromise: saveJudgedCarInfoPromise,
          updateJudgedCarInfoPromise: updateJudgedCarInfoPromise,
          deleteJudgedCarInfoPromise: deleteJudgedCarInfoPromise
      };

      function getJudgedCarInfosPromise(showId) {
        return judgedCarInfoResource.query({id:showId}).$promise;
      }

      function saveJudgedCarInfoPromise(judgedCarInfo) {
          return judgedCarInfoResource.save(judgedCarInfo).$promise;
      }

      function updateJudgedCarInfoPromise(judgedCarInfo) {
          return judgedCarInfoResource.update({id: carshow.id}, judgedCarInfo).$promise;
      }

      function deleteJudgedCarInfoPromise(judgedCarInfo) {
          return judgedCarInfoResource.remove({id:carshow.id}, carshow).$promise;
      }

    }
})();
