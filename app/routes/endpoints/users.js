var bCrypt = require('bcrypt-nodejs');
var generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};
module.exports = function (app, user) {
  var User = user;

  app.get('/api/user', function(req, res) {
     var userId = req.user.id;
     User.findOne({
         where: {id: userId},
         include: [{ all: true, nested: true }]
     }).then(function(user) {
         return res.json(user);
     })
  });

  app.get('/api/users/:username', function (req, res) {
      var username = req.params.username;
      User.findOne({where: {username: username}}).then(function(users) {
          return res.json(users);
      });
  });

  app.post('/api/user', function(req, res) {
      var userPassword = generateHash(req.body.password);
      var data = {
          firstname: '',
          lastname: '',
          username: req.body.username,
          password: userPassword
      };
      User.create(data).then(function(user){
          user.password = null;
          return res.json(user);
      });
  });

  app.delete('/api/user/:id', function(req, res) {
      User.destroy({where:{id: req.params.id}}).then(function() {
          res.status(204).send({message:'User deleted.'});
      });
  });

};
