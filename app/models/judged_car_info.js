module.exports = function(sequelize, Sequelize) {
    var judged_car_info = sequelize.define('judged_car_info', {
        car_number: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        class: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        year: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        make: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        model: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        full_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        city: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        car_score: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        carShowId: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    });

    return judged_car_info;
}
