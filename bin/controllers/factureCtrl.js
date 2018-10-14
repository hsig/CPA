// bin/controllers/ContractCtrl.js
var Facture     = require ('../models/facture');

module.exports = function (){

  this.getFactures = function (req, res) {
    Facture.find(function(err, factures) {
      if (err)
        res.send(err);
      else
        res.json(factures);
    });
  };

  this.postFacture = function (req, res) {
    facture = new Facture();
    facture.clientNom      = req.body.clientNom;  // Set the contract properties that came from the POST data
    facture.num_facture    = req.body.num_facture;
    facture.date_facture   = req.body.date_facture;//.toISOString();
    facture.date_echeance  = req.body.date_echeance;
    facture.date_livraison = req.body.date_livraison;
    facture.notes          = req.body.notes;
    facture.montantTotal   = req.body.montantTotal;
    facture.article        = req.body.article;

    facture.save(function(err,doc) {  // Save the contract and check for errors
      //console.log(err)
      if (err){
        res.send(err);
      }else{
        res.json({ message: 'Facture !', data: doc});
      }
    });
  };

  this.deleteFacture = function (req, res) {
    var id = req.params.id;
    Facture.remove({_id : id}, function (err, facture) {
      if (err)
        res.send(err);
      else
        res.json(Facture);
    });
  };

  this.editFacture = function (req, res) {
    var id = req.params.id;
    Facture.findOne({_id : id},function(err, facture) {
      if (err)
        res.send(err);
      else
        res.json(facture);
    });
  };

  this.updateFacture = function (req, res) {
    var id = req.params.id;
    Facture.findOneAndUpdate(
      {_id: id},
      {$set:{clientNom:req.body.clientNom,
             num_facture:req.body.num_facture,
             date_facture:req.body.date_facture,
             date_echeance:req.body.date_echeance}
      }, function (err, doc) {
        if (err)
          res.send(err);
        else
          res.json(doc);
      });
  };
};
