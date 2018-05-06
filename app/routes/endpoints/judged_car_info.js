module.exports = function (app, judged_car_info) {
  //API ROLES PROVIDED TO NG RolesService

  var judgedCarInfo = judged_car_info;

  app.get('/api/judged_car_info/:id', function (req, res) {

      var showId = req.params.id;

      judgedCarInfo.findAll({where: {carShowId: showId}, order: [
          ['class', 'ASC'],
          ['car_score',  'DESC']
      ]}).then(function(judgedCarInfos) {
          return res.json(judgedCarInfos);
      });

  });

  app.post('/api/judged_car_info', function (req, res) {
      var data = {
          show_name: req.body.show_name,
          car_number: req.body.car_number,
          class: req.body.class,
          year: req.body.year,
          make: req.body.make,
          model: req.body.model,
          full_name: req.body.full_name,
          city: req.body.city,
          state: req.body.state,
          car_score: req.body.car_score,
          carShowId: req.body.carShowId
      };
     judgedCarInfo.create(data).then(function(judgedCarInfo) {
         return res.json(judgedCarInfo)
     });
  });

  app.put('/api/judged_car_info/:id', function (req, res) {
      var data = {
          id: req.body.id,
          show_name: req.body.show_name,
          car_number: req.body.car_number,
          class: req.body.class,
          year: req.body.year,
          make: req.body.make,
          model: req.body.model,
          full_name: req.body.full_name,
          city: req.body.city,
          state: req.body.state,
          car_score: req.body.car_score,
          carShowId: req.body.carShowId
      };
      judgedCarInfo.upsert(data).then(function(judgedCarInfo) {
          return res.json(judgedCarInfo);
      });
  });

  app.delete('/api/judged_car_info/:id', function() {
      return judgedCarInfo.destroy(data).then(function(){
          res.status(204).send({message:'Judged car info deleted.'});
      })
  })

};
