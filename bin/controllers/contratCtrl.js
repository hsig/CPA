// bin/controllers/ContractCtrl.js
var Contrat     = require ('../models/contrat');

module.exports = function (){

  this.getContrats = function (req, res) {
    Contrat.find(function(err, contrats) {
      if (err)
        res.send(err);
      else
        res.json(contrats);
    });
  };

  this.postContrat = function (req, res) {

    contrat = new Contrat();
    contrat.clientNom     = req.body.clientNom;  // Set the contract properties that came from the POST data
    contrat.clientNomSup  = req.body.clientNomSup;
    contrat.voitureImm    = req.body.voitureImm;
    contrat.dateDebut     = req.body.dateDebut;//.toISOString();
    contrat.dateFin       = req.body.dateFin;
    contrat.type          = req.body.type;
    contrat.client        = req.body.client;
    contrat.clientSup     = req.body.clientSup;
    contrat.voiture       = req.body.voiture;

    contrat.save(function(err,doc) {  // Save the contract and check for errors
      if (err)
        res.send(err);
      else
        res.status(200).send('contrat & voiture! OK');
    });
  };

  this.deleteContrat = function (req, res) {
    var id = req.params.id;
    Contrat.remove({_id : id}, function (err, contrat) {
      if (err)
        res.send(contrat);
      else
        res.status(200).send('rm contrat & voiture! OK');
    });
  };

  this.editContrat = function (req, res) {
    var id = req.params.id;
    Contrat.findOne({_id : id},function(err, contrat) {
      if (err)
        res.send(err);
      else
        res.json(contrat);
    });
  };

  this.updateContrat = function (req, res) {
    var id = req.params.id;
    Contrat.findOneAndUpdate(
      {_id: id},
      {$set:{clientNom    :req.body.clientNom,
             clientNomSup :req.body.clientNomSup,
             dateDebut    :req.body.dateDebut,
             dateFin      :req.body.dateFin,
             voitureImm   :req.body.voitureImm}
      }, function (err, doc) {
        if (err)
          res.send(err);
        else
          res.json(doc);
      });
  };
};
