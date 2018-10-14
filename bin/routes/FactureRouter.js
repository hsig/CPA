// bin/routes/VoitureRouter.js
var user      = require('../controllers/userCtrl'),
    facture   = require('../controllers/factureCtrl');

// expose the routes to our app with module.exports
module.exports = function(app, passport) {

    user    = new user();
    facture = new facture();

    app.route('/facture')
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        facture.getFactures(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .post(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token){
        facture.postFacture(req,res);
      }else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });

    app.route('/factures/:id')
    .delete(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        facture.deleteFacture(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        facture.editFacture(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .put(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        facture.updateFacture(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });
};
