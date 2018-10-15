// bin/controllers/VoitureCtrl.js
var User    = require ('../models/user');
var jwt     = require('jwt-simple');
var config  = require('../../config/jwt');


module.exports = function (){

  // create a new user account (POST http://localhost:9090/api/signup)
  this.postUser = function (req, res) {
    if (!req.body.name || !req.body.password) {
      res.json({success: false, msg: 'Please pass name and password.'});
    } else if (!req.body.user){
      res.json({success: false, msg: 'Please pass valid user.'});
    } else {
      var newUser = new User({
        name      : req.body.name || req.body.user.name,
        password  : req.body.password || req.body.user.name,
        role      : !req.body.role ? "guest" : req.body.role
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }else{
          res.json({success: true, msg: 'Successful created new user.'});
        }
      });
    }
  };

  // route to authenticate a user (POST http://localhost:9090/api/authenticate)
  this.postAuthUser = function(req, res) {
    console.log(req.body);
    User.findOne({ name: req.body.name }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.encode(user, config.secret);
              var id = user.id.substring(0,6);
              res.json({success: true, token: 'JWT ' + token, user : user, id : id});
          } else {
              res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  };

  // route to a restricted info (GET http://localhost:8080/api/memberinfo)
  this.getInfoUser = function(req, res, token) {
    var token = this.getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      //console.log(decoded)
      User.findOne({
        name: decoded.name
      }, function(err, user) {
          if (err) throw err;
          //console.log(user)
          if (!user) {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
          } else {
            res.json({success: true, msg:  user.name });
          }//'Welcome in the CPA area ' +
      });
    } else {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  };

  this.getUsers = function(req, res, token) {
    var token = this.getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      //console.log(decoded)
      User.find({}, function(err, users) {
          if (err) throw err;
          //console.log(users)
          if (users.length <= 0) {
            return res.status(403).send({success: false, msg: 'getUsers failed. Users empty.'});
          } else {
            res.json({success: true, msg:  users });
          }//'Welcome in the CPA area ' +
      });
    } else {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  };

  this.getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  this.getuserPermission = function (req, res){
    var query = User.find({}).select({"role":1,
                                         "_id" :0});

    query.exec(function (err, doc){
      if (err){
        //console.log(err);
        res.send({success: false, msg: 'GET failed.'});
      }else{
        //console.log(doc);
        res.json({ message: 'Success !', data: doc});
      }

    });
  }
};
