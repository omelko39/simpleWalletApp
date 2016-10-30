var Model = require('../model/models');

module.exports = {
    create: (req, res, next) => {
        let body = req.body;
        body.user_id = req.user.id;
        body.state = 0;
        Model.Wallet.create(body).then(function (wallet) {
            res.json({success: true, wallet: wallet});
        }).catch(err => res.json(err));
    },
    delete: (req, res, next) => {
        let userId = req.user.id;
        let id = req.param.id;
        Model.Wallet.destroy({where: {id: id, user_id: userId}})
            .then(function (wallet) {
                    res.json({success: true, wallet: wallet});
                })
            .catch((err) => {res.json({success: false, err: err})});
    },
    getUserWallets: (req, res, next) => {
        Model.Wallet.findAll({where: {user_id: req.user.id}}).then(function (wallet) {
            res.json(wallet);
        }).catch((err) => {res.json({success: false, err: err})});
    }
}