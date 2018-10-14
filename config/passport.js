// config/passport.js
var JwtStrategy = require('passport-jwt').Strategy;
var User        = require('../bin/models/user');          // load up the user model
var config      = require('../config/jwt');               // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
