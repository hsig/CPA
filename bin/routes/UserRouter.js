// bin/routes/UserRouter.js
var user      = require('../controllers/userCtrl');

// expose the routes to our app with module.exports
module.exports = function(app, passport, express) {

    user = new user();

    var userRoute   = express.Router();
    // connect the api routes under /api/*
    app.use('/api', userRoute);

    userRoute.route('/signup')
    .post(passport.authenticate('jwt', { session: false}), function(req,res){
      var token = user.getToken(req.headers);
      if(token)
        user.postUser(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });

    userRoute.route('/register')
    .post(function(req,res){
      if(req.body.user)
        user.postUser(req,res);
      else
        return res.status(403).send({success: false, msg: 'Not ok.'});
    });

    userRoute.route('/authenticate')
    .post(function(req,res){
        user.postAuthUser(req,res);
    });

    userRoute.route('/memberinfo')
    .get(passport.authenticate('jwt', { session: false}), function(req,res){
      var token = user.getToken(req.headers);
      if(token)
        user.getInfoUser(req,res, token);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });

    userRoute.route('/userPermission')
    .get(function(req,res){
        user.getuserPermission(req,res);
    })

    userRoute.route('/users')
    .get(function(req,res){
        user.getUsers(req,res);
    });

};
