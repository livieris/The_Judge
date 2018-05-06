(function() {
  angular.module('app')
    .factory('CarCriteriaService',CarCriteriaService);

    function CarCriteriaService (
      $resource,
      lodash
    ) {
      var carCriteriaResource = $resource('/api/car_criteria/:id');

      return {
          getCarCriteriasPromise: getCarCriteriasPromise,
          saveCarCriteriaPromise: saveCarCriteriaPromise,
          updateCarCriteriaPromise: updateCarCriteriaPromise,
          deleteCarCriteriaPromise: deleteCarCriteriaPromise
      };

      function getCarCriteriasPromise() {
        return carCriteriaResource.query().$promise;
      }

      function saveCarCriteriaPromise(carCriteria) {
          if (!lodash.isArray(carCriteria)) {
              carCriteria = [carCriteria];
          }
          return carCriteriaResource.saveAll(carCriteria).$promise;
      }

      function updateCarCriteriaPromise(carCriteria) {
          return carCriteriaResource.update({id: carCriteria.id}, carCriteria).$promise;
      }

      function deleteCarCriteriaPromise(carCriteria) {
          return carCriteriaResource.remove({id: carCriteria.id}, carshow).$promise;
      }

    }
})();
