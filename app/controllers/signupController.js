var Model = require('../model/models.js')

module.exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    req.flash('error', "Please, fill in all the fields.");
    res.redirect('signup')
  }
  var newUser = {
    user: username,
    name: password
  };
  
  Model.User.create(newUser).then(function(user) {
    Model.Wallet.create({
      name: 'DefaultUserWallet',
      state: 0,
      user_id: user.id
    }).then(wallet => res.json({success: true, msg: 'Registration Complete'}))
  }).catch(function(error) {
    res.json({success: false, msg: 'Registration Failed', error: error})
  })
}