module.exports = function (app, role, permission) {
  //API ROLES PROVIDED TO NG RolesService

  var Role = role;
  var Permission = permission;

  app.get('/api/roles', function (req, res) {

      Role.findAll( {include: [Permission]}).then(function(roles) {
          return res.json(roles);
      });

  });

};
