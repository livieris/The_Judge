module.exports = function(sequelize, Sequelize) {
    var Role = sequelize.define('role', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Role;
}