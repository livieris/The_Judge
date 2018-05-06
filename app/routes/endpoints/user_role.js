module.exports = function (app, user_role) {
    var UserRole = user_role;

  app.post('/api/userrole', function (req, res) {

      var data = {
          userId: req.body.userId,
          roleId: req.body.roleId
      }

      UserRole.create(data).then(function(user_role){
          return res.json(user_role);
      });

  });

};
