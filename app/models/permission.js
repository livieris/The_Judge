module.exports = function(sequelize, Sequelize) {
    var Permission = sequelize.define('permission', {
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

    return Permission;
}
