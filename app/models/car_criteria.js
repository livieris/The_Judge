module.exports = function(sequelize, Sequelize) {
    var car_criteria = sequelize.define('car_criteria', {
        criteria: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });

    return car_criteria;
}
