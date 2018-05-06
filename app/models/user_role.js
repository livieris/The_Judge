module.exports = function(sequelize, Sequelize) {
    var UserRole = sequelize.define('user_role', {});

    return UserRole;
}
