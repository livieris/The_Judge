(function() {
  angular.module('app')
    .factory('CarShowService',CarShowService);

    function CarShowService (
      $resource
    ) {
        var carShowSaveResource = $resource('/api/car_show');
      var carShowResource = $resource('/api/car_show/id/:id');
      var carShowResourceJudge = $resource('/api/car_show/judge/:name');
      var carShowResourceUser = $resource('/api/car_show/user');

      return {
          getCarShowPromise: getCarShowPromise,
          saveCarShowPromise: saveCarShowPromise,
          updateCarShowPromise: updateCarShowPromise,
          deleteCarShowPromise: deleteCarShowPromise,
          getJudgeCarShows: getJudgeCarShows,
          getUserCarShows: getUserCarShows
      };

      function getCarShowPromise(id) {
        return carShowResource.get({id:id}).$promise;
      }

      function saveCarShowPromise(carShow) {
          return carShowSaveResource.save(carShow).$promise;
      }

      function updateCarShowPromise(carShow) {
          return carShowResource.update({id: carShow.id}, carShow).$promise;
      }

      function deleteCarShowPromise(carShow) {
          return carShowResource.remove({id:carShow.id}, carShow).$promise;
      }

      function getJudgeCarShows(name) {
          return carShowResourceJudge.get({name: name}).$promise;
      }

      function getUserCarShows() {
          return carShowResourceUser.query().$promise;
      }

    }
})();
