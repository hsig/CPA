// bin/controllers/VoitureCtrl.js
var Voiture = require ('../models/voitures');

module.exports = function (){

  this.getVoitures = function (req, res) {
    Voiture.find(function(err, voitures) {
      if (err){
        res.send(err);
      }else{
        res.send(voitures);
      }
    });
  };

  this.getVoituresByStatus = function (req, res) {
    if (req.params.id == "non disponible"){
      Voiture.find({used : false},function(err, voitures) {
        if (err){
          res.send(err);
        }else{
          res.send(voitures);
        }
      });
    }else if (req.params.id == "reservation"){
      Voiture.find({used_type : 'showroom'},function(err, voitures) {
        if (err){
          res.send(err);
        }else{
          res.send(voitures);
        }
      });
    }

  };

  this.postVoitures = function (req, res) {

    var voiture = new Voiture({
      model :req.body.model,
      genre :req.body.genre,
      km    :req.body.km,
      used  :req.body.used,
      immatriculation :req.body.immatriculation

    });
    voiture.save(function(error , voiture , numAffected) {  // Save the voiture and check for errors
      if (error) {
        //res.json({success: false, msg: 'Please fill a valid Imm address'});
        res.status(422).send('Problem:' + error.message);
      }else{
        //res.json({success: true, msg: 'Successful created new car.'});
        res.status(200).send('OK');
      }
    });
  };

  this.deleteVoiture = function (req, res) {
    var id = req.params.id;
    Voiture.remove({_id : id}, function (err, voiture) {
      if (err)
        res.send(err);
      else
        res.json(voiture);
    });
  };

  this.editVoiture = function (req, res) {
    var id = req.params.id;
    Voiture.findOne({_id : id},function(err, voiture) {
      if (err)
        res.send(err);
      else
        res.json(voiture);
    });
  };

  this.updateVoiture = function (req, res) {
    var id = req.params.id;
    Voiture.findOneAndUpdate(
      {_id: id},
      {$set:{immatriculation:req.body.immatriculation,
             model:req.body.model,
             genre:req.body.genre,
             km:req.body.km,
             used:req.body.used}
      }, function (err, doc) {
        if (err)
          res.status(422).send('Problem:' + err.message);
        else
          res.status(200).send('OK');
      }
    );
  };

  this.updateVoitureUsed = function (req, res){
    var id = req.body.voiture._id;
    Voiture.findOneAndUpdate(
      {_id: id},
      {$set:{used:req.body.voiture.used}}, function (err, doc) {
          if (err){
            res.status(422).send('Problem:' + err.message);
          }else{
            res.status(200).send('rm contrat & voiture! OK');
          }
      });
  };

};
