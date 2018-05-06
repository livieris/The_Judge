module.exports = function (app, car_criteria) {
  //API ROLES PROVIDED TO NG RolesService

  var carCriteria = car_criteria;

  app.get('/api/car_criteria', function (req, res) {

      carCriteria.findAll().then(function(carCriterias) {
          return res.json(carCriterias);
      });

  });

  app.post('/api/car_criteria', function (req, res) {
     carCriteria.bulkCreate(req.body, {returning: true}).then(function(carCriteria) {
         return res.json(carCriteria)
     });
  });

  app.put('/api/car_criteria/:id', function (req, res) {
      var data = {
          id: req.body.id,
          show_name: req.body.show_name,
          criteria: req.body.criteria,
      };
      carCriteria.upsert(data).then(function(car_criteria) {
          return res.json(carCriteria);
      });
  });

  app.delete('/api/car_criteria/:id', function() {
      var data = {
          id: req.body.id,
          show_name: req.body.show_name,
          criteria: req.body.criteria,
      };
      return carCriteria.destroy(data).then(function(){
          res.status(204).send({message:'Car criteria deleted.'});
      })
  })

};
