var Model = require('../../app/model/models.js')

module.exports = function(callback) {
  // recreate User table
  Model.User.sync({  }).then(function() {
    // create username with username: user and 
    // password: user
    Model.User.create({
      name: 'user',
      pass: 'pass',
    }).then(user => {
        Model.Wallet.sync()
            .then(() => {
                Model.Wallet
                    .create({
                        name: 'DefaultUserWallet',
                        user_id: user.id,
                        state: 0
                    })
                    .then(wallet => {
                        Model.User.update(
                            {selected_wallet: wallet.id},
                            {where: {id: user.id}}
                        )
                    });
                Model.User.create({
                    name: 'user2',
                    pass: 'pass'
                }).then(user2 => {
                    Model.Wallet.create({
                        name: 'DefaultUserWallet',
                        user_id: user2.id,
                        state: 0
                    }).then(wallet2 => {
                        Model.User.update(
                            {selected_wallet: wallet2.id},
                            {where: {id: user2.id}}
                        )
                    });
                })
            });
    })
  });
    Model.Transaction.sync()
        .then(() => {

        });
}