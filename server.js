

var express = require('express');
var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var path = require('path');
var sequelize_fixtures = require('sequelize-fixtures');

var env = require('dotenv').load();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Models
var models = require("./app/models");

//virtual connection to node_modules for vendor file serving
app.use('/app', express.static(path.join(__dirname, 'app/webapp')));
app.use('/vendor', express.static(path.join(__dirname, '/node_modules')));

//TopLevelRoutes
app.get('/', function(req, res) {
    res.render('app');
});

//Routes (API endpoints)
var authRoute = require('./app/routes/auth.js')(app, passport);
var roleEndPoint = require('./app/routes/endpoints/role.js')(app, models.role, models.permission);
var permissionEndPoint = require('./app/routes/endpoints/permission.js')(app, models.permission);
var carShowEndPoint = require('./app/routes/endpoints/car_show.js')(app, models.car_show);
var carCriteriaEndPoint = require('./app/routes/endpoints/car_criteria.js')(app, models.car_criteria);
var judgedCarInfoEndpoint  = require('./app/routes/endpoints/judged_car_info.js')(app, models.judged_car_info);
var userEndpoint = require('./app/routes/endpoints/users.js')(app, models.user);
var userRoleEndpoint = require('./app/routes/endpoints/user_role.js')(app, models.user_role);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database remove force when models done
models.sequelize.sync().then(function() {
//models.sequelize.sync({force: true}).then(function() {
    console.log('Nice! Database looks fine');
    //load fixtures into database
    sequelize_fixtures.loadFile('app/fixtures/*.json', models).then(function(){
        console.log('Fixtures loaded');
    }).catch(function(err) {
        console.error(err, "Fixture load error.");
    });
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});

//ActualServerCreation
app.listen(5000, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});
