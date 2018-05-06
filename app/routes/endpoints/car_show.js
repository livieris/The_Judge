module.exports = function (app, car_show) {
  //API ROLES PROVIDED TO NG RolesService

  var carShow = car_show;

  app.get('/api/car_show/id/:id', function (req, res) {

      var showId = req.params.id;

      carShow.findOne({where: {id: showId}, include: [{ all: true, nested: true }]}).then(function(carShows) {
          return res.json(carShows);
      });

  });

  app.get('/api/car_show/judge/:name', function (req, res) {

      var judgeName = req.params.name;

      carShow.findOne({
          where: {judge_user: judgeName},
          include: [{ all: true, nested: true }]
      }).then(function(carShows) {
          return res.json(carShows);
      });

  });

  app.get('/api/car_show/user', function (req, res) {
      var userId = req.user.id;
      console.log(userId);

      carShow.findAll({
          where: {userId: userId},
          include: [{ all: true, nested: true }]
      }).then(function(carShows) {
          return res.json(carShows);
      });

  });

  app.post('/api/car_show', function (req, res) {
      var data = {
          show_name: req.body.show_name,
          city: req.body.city,
          state: req.body.state,
          judge_user: req.body.judge_user,
          judge_pass: req.body.judge_pass,
          num_of_classes: req.body.num_of_classes,
          userId: req.body.userId
      };
     carShow.create(data).then(function(carShow) {
         return res.json(carShow)
     });
  });

  app.put('/api/car_show/id/:id', function (req, res) {
      var data = {
          id: req.body.id,
          show_name: req.body.show_name,
          city: req.body.city,
          state: req.body.state,
          jude_user: req.body.judge_user,
          judge_pass: req.body.judge_pass,
          num_of_classes: req.body.num_of_classes,
          userId: req.body.userId
      };
      carShow.upsert(data).then(function(carShow) {
          return res.json(carShow);
      });
  });

  app.delete('/api/car_show/:id', function() {
      var data = {
          id: req.body.id,
          show_name: req.body.show_name,
          city: req.body.city,
          state: req.body.state,
          jude_user: req.body.judge_user,
          judge_pass: req.body.judge_pass,
          num_of_classes: req.body.num_of_classes,
          userId: req.body.userId
      };
      return carShow.destroy(data).then(function(){
          res.status(204).send({message:'Car show deleted.'});
      })
  })

};
