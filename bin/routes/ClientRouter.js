// bin/routes/ClientRouter.js
var _client    = require('../controllers/clientCtrl'),
    _user      = require('../controllers/userCtrl');

// expose the routes to our app with module.exports
module.exports = function(app, passport) {

    user    = new _user();
    client  = new _client();

    app.route('/clients')
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        client.getClients(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .post(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        client.postClients(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });

    app.route('/clients/:id')
    .delete(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        client.deleteClients(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        client.editClients(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .put(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        client.updateClients(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });

};
