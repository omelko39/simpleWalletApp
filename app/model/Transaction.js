var Sequelize = require('sequelize');

var attributes = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    from: {
        type: Sequelize.INTEGER,
    },
    to: {
        type: Sequelize.INTEGER,
    },
    amount: Sequelize.REAL

};

var options = {
    tableName: 'transaction',

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false,

    // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false
};

module.exports.attributes = attributes;
module.exports.options = options;