var Sequelize = require('sequelize')

var attributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.CHAR(50),
    state: Sequelize.REAL,
    user_id: {
        type: Sequelize.INTEGER
    }
};

var options = {
    tableName: 'wallet',

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false,

    // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false
};

module.exports.attributes = attributes;
module.exports.options = options;