module.exports = function(sequelize, Sequelize) {
    var car_show = sequelize.define('car_show', {
        show_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        city: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        state: {
            type: Sequelize.STRING
        },
        judge_user: {
            type: Sequelize.STRING
        },
        num_of_classes: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.STRING,
        }
    });

    return car_show;
}
