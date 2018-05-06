module.exports = function(app, passport) {

    //API ROUTES PROVIDED TO NG
    app.post('/api/login',
      passport.authenticate('local-signin'), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        req.user.password = null;//hide password hash
        res.json(req.user);
    });

    app.post('/api/register',
      passport.authenticate('local-signup'), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        req.user.password = null;//hide password hash
        res.json(req.user);
    });

    app.get('/api/logout', function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                res.status(500).send({
                    message: 'A server error has occurred.',
                    errorData: err
                });
            }
            res.status(200).send({message:'User logged out.'});
        });
    });

    app.get('/api/authenticated', function(req, res) {
        if (req.isAuthenticated()) {
            req.user.password = null;//hide password hash
            res.json(req.user);
        } else {
            res.json({ id: null});
        }

    });

}
