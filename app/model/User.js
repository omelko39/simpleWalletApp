var Sequelize = require('sequelize')

var attributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.CHAR(128),
  pass: Sequelize.STRING,
  selected_wallet: Sequelize.INTEGER
};

var options = {
  tableName: 'user',

  // I don't want createdAt
  createdAt: false,

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false,

  // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
  deletedAt: false
};

module.exports.attributes = attributes;
module.exports.options = options;