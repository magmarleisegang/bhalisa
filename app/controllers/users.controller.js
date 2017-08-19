var User = require('../models/user');

module.exports = {
    seed: seedUser,
};

function seedUser(req, res) {
  // create a sample user
  var nick = new User({ 
    name: 'user1', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
};