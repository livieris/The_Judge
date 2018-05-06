module.exports = function (app, permission) {
  //API permissions PROVIDED TO NG PermissionsService

  var Permission = permission;

  app.get('/api/permissions', function (req, res) {
      
      Permission.findAll().then(function(permissions) {
          return res.json(permissions);
      });

  });

};
