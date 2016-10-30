var passport = require('passport'),
    Model = require('../model/models'),
    walletControler = require('../controllers/walletController'),
    transactionController = require('../controllers/transactionController'),
    signupController = require('../controllers/signupController.js');

module.exports = function(express) {
  var router = express.Router();

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.json({error: true, status: 'Not Authentificate'});
  };
  
  router.post('/signup', signupController.signup);

  router.post('/login',
      passport.authenticate('local'),
      (req, res) => {
        res.json({
          success: true,
          status: 'Login Success',
          user: req.user});
  });


  router.get('/logout', function(req, res) {
    req.logout();
    res.json({success: true});
  });

  router.get('/user', isAuthenticated, (req, res, next) => {
    res.json(req.user);
  });

  router.get('/users', isAuthenticated, (req, res, next) => {
    Model.User.findAll({where: {id: {$ne: req.user.id}}})
        .then(users => {
          res.json(users)
        })
        .catch(err => {
          res.json(err)
        });
  });

  //CREATE WALLET
  router.post('/wallet', isAuthenticated, walletControler.create);

  //DELETE WALLET
  router.delete('/wallet', isAuthenticated, walletControler.delete);

  // GET USER WALLETS
  router.get('/wallets/:id', isAuthenticated,  walletControler.getUserWallets);

  router.get('/transaction', isAuthenticated, transactionController.getUserTransactions);

  router.post('/transaction', isAuthenticated, transactionController.createTransaction);

  return router
};