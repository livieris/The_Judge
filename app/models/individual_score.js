module.exports = function(sequelize, Sequelize) {
    var ind_score = sequelize.define('individual_score', {
        carShowId: {
          type: Sequelize.INTEGER
        },
        full_name: {
            type: Sequelize.STRING
        },
        criteria: {
            type: Sequelize.STRING
        },
        score: {
          type: Sequelize.INTEGER
        }
    });

    return ind_score;
}
