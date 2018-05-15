module.exports = function (app, individual_score) {
  //API ROLES PROVIDED TO NG RolesService
var Sequelize = require("sequelize");
  var individualScore = individual_score;
  var Op = Sequelize.Op;

  app.get('/api/individual_score/carShowId/:carShowId/full_name/:full_name', function (req, res) {

      individualScore.findAll({where:
        {
          carShowId: req.params.carShowId,
          full_name: {
            [Op.like]:  '%'+req.params.full_name+'%'
          }
        }}).then(function(individualScores) {
            return res.json(individualScores);
      });

  });

  app.post('/api/individual_score', function (req, res) {
     individualScore.bulkCreate(req.body, {returning: true}).then(function(individualScore) {
         return res.json(individualScore);
     });
  });

  app.put('/api/individual_score/id/:id', function (req, res) {
      var data = {
        carShowId: req.body.carShowId,
        full_name: req.body.full_name,
        criteria: req.body.criteria,
        score: req.body.score
      };
      individualScore.upsert(data).then(function(individualScore) {
          return res.json(individualScore);
      });
  });

  app.delete('/api/individual_score/:id', function() {
      var data = {
          id: req.body.id,
          show_name: req.body.show_name,
          city: req.body.city,
          state: req.body.state,
          jude_user: req.body.judge_user,
          judge_pass: req.body.judge_pass,
          num_of_classes: req.body.num_of_classes,
          userId: req.body.userId,
          date: req.body.date
      };
      return individualScore.destroy(data).then(function(){
          res.status(204).send({message:'Car show deleted.'});
      })
  })

};
