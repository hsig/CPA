// bin/routes/VoitureRouter.js
var user      = require('../controllers/userCtrl'),
    contrat   = require('../controllers/contratCtrl');

// expose the routes to our app with module.exports
module.exports = function(app, passport) {

    user    = new user();
    contrat = new contrat();

    app.route('/contrats')
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        contrat.getContrats(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .post(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token){
        if (req.body.pdf)
          contrat.postContratPdf(req,res);
        else
          contrat.postContrat(req,res);
      }else{
        return res.status(403).send({success: false, msg: 'No token provided.'});
      }
    });

    app.route('/contrats')
    .delete(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        contrat.deleteContrat(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        contrat.editContrat(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .put(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        contrat.updateContrat(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });

};
