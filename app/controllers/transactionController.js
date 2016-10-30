var Model = require('../model/models');
var sequalize = require('../sequelize');
var EventEmitter = require('../socket');

function getWalletsByIds(ids, transaction) {
    return Model.Wallet
        .findAll({
            where: {id: {$in: ids}},
            transaction: transaction
        });
}
function debit(wFrom, t, amount) {
    let fState = +wFrom.state;
    return Model.Wallet.update(
        {state: fState - amount},
        {
            where: {id: wFrom.id},
            transaction: t
        });
}

function coming(wTo, t, amount) {
    let tState = +wTo.state;

    return Model.Wallet.update(
        {state: tState + amount},
        {
            where: {id: wTo.id},
            transaction: t
        });
}

function insertTransaction(wFrom, wTo, amount, t) {
    return Model.Transaction.create({
        from: wFrom.id,
        to: wTo.id,
        amount: amount
    }, {transaction: t});
}

function doTransaction(wallets, amount, from, to, t) {
    if (wallets.length === 2) {
        let wFrom = wallets.find(el => el.id === from);
        let wTo = wallets.find(el => el.id === to);

        return debit(wFrom, t, amount).then(res1 => {
            return coming(wTo, t, amount).then(res2 => {
                return insertTransaction(wFrom, wTo, amount, t)
            });
        })
    } else {
        return Promise.reject('Not wallet found');
    }
}

module.exports = {
    getUserTransactions: (req, res, next) => {
            let user = req.user;
            let userWallets = user.wallets;
            let ids = userWallets.map(res => res.id);
            Model.Transaction
                .findAll({
                    where: {
                        $or: [
                            {from: {$in: ids}},
                            {to: {$in: ids}},
                        ],

                    }
                })
                .then(trans => {res.json(trans)})
                .catch(err => res.json({success: false, err: err}));
    },
    createTransaction: (req, res, next) => {
        let from = req.body.from;
        let to = req.body.to;
        let amount = +req.body.amount;
        let userWallets = req.user.wallets;
        if (userWallets.find(el => +el.id === +from)) {

            sequalize.transaction(t => {
                return getWalletsByIds([from, to], t)
                    .then(wallets => doTransaction(wallets, amount, from, to, t))
            }).then(result => {
                Model.Wallet.findOne({where: {id: to}}).then(wallet => {
                    EventEmitter.emit('push', {id: wallet.user_id, trans: result});
                });
                res.json(result)
            }).catch(err => res.json({success: false, msg: "transaction failed", err: err}));
        } else {
            res.json('sender wallet not found')
        }
    }
};