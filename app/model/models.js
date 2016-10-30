var UserMeta = require('./User.js'),
    WalletMeta = require('./Wallet.js'),
    TransactionMeta = require('./Transaction.js'),
    connection = require('../sequelize.js')

var User = connection.define('users', UserMeta.attributes, UserMeta.options);
var Wallet = connection.define('wallets', WalletMeta.attributes, WalletMeta.options);
var Transaction = connection.define('transactions', TransactionMeta.attributes, TransactionMeta.options);

// you can define relationships here
User.hasMany(Wallet, {foreignKey: 'user_id'});
Wallet.belongsTo(User, { foreignKey: 'user_id'});

module.exports.User = User;
module.exports.Wallet = Wallet;
module.exports.Transaction = Transaction;