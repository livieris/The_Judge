"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

//do associations here
db.user.belongsToMany(db.role, { through: db.user_role});
db.role.belongsToMany(db.user, { through: db.user_role});
db.role.belongsToMany(db.permission, { through: 'role_permissions'});
db.permission.belongsToMany(db.role, { through: 'role_permissions'});
db.user.hasMany(db.car_show);
db.car_show.hasMany(db.car_criteria);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
