var User = require('../models/user');
var jwt = require('jsonwebtoken');
var Cookies = require('cookies');

module.exports = {
    authMiddleware: authMiddleware,
    authenticate: authenticate,
    loginpage:login
};

function authMiddleware(req, res, next) {
    //   var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token = new Cookies(req,res).get('access_token');

    // decode token
    if (token) {
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        renderLoginPage(res,new User());
    }
}

function authenticate(req, resp)       {
 User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
        renderLoginPage(resp, new User(), 'Authentication failed. User not found.');
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        renderLoginPage(resp, new User(), 'Authentication failed. Wrong password.');
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, req.app.get("superSecret"), {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        var tokenCookies = new Cookies(req,resp).set('access_token', token ,{
            httpOnly: true,
            // secure: true      // for your production environment
        });
        // return the information including token as JSON
        resp.redirect("events");
      }  
    }
  });
}

function login(req,resp){
    renderLoginPage(resp, new User());
}

function renderLoginPage(resp, user, message)
{
    resp.render("pages/login", {usr:user, msg:message});
}