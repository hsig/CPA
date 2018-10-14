// bin/routes/VoitureRouter.js
var user      = require('../controllers/userCtrl'),
    voiture   = require('../controllers/voitureCtrl');
module.exports = function(app, passport) {

    voiture = new voiture();
    user    = new user();

    app.route('/voitures')
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token){
        voiture.getVoitures(req,res);
      }else{
        return res.status(403).send({success: false, msg: 'No token provided.'});
      }
    })
    .post(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        voiture.postVoitures(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    });

    app.route('/voitures/:id')
    .delete(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token)
        voiture.deleteVoiture(req,res);
      else
        return res.status(403).send({success: false, msg: 'No token provided.'});
    })
    .get(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token){
        //console.log(req.params)
        if (req.params.id == "non disponible"){
          voiture.getVoituresByStatus(req,res);
        }else if (req.params.id == "reservation"){
          voiture.getVoituresByStatus(req,res);
        }else {
          voiture.editVoiture(req,res);
        }
      }else{
        return res.status(403).send({success: false, msg: 'No token provided.'});
      }
    })
    .put(passport.authenticate('jwt', { session: false}), function(req, res){
      var token = user.getToken(req.headers);
      if(token){
        voiture.updateVoiture(req,res);
      }else{
        return res.status(403).send({success: false, msg: 'No token provided.'});
      }
    });

};
