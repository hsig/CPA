// bin/controllers/clientCtrl.js
var Client = require ('../models/client');

module.exports = function (){

  this.getClients = function (req, res) {
    Client.find(function(err, client) {
      if (err){
        res.send(err);
      }else{
        res.send(client);
      }
    });
  };

  this.postClients = function (req, res) {
    client = new Client();
    client.nom            = req.body.nom;  // Set the client properties that came from the POST data
    client.prenom         = req.body.prenom;
    client.dateNaissance  = req.body.dateNaissance;
    client.adresse        = req.body.adresse;
    client.nationalite    = req.body.nationalite;
    client.numPermis      = req.body.numPermis;
    client.datePermis     = req.body.datePermis;
    client.email          = req.body.email;

    client.save(function(err) {  // Save the client and check for errors
      if (err){
        res.send(err);
      }else{
        res.json({ message: 'client added !', data: client });
      }
    });
  };

  this.deleteClients = function (req, res) {
    var id = req.params.id;
    Client.remove({_id : id}, function (err, client) {
        if (err){
          res.send(err);
        }else{
          res.json(client);
        }
    });
  };

  this.editClients = function (req, res) {
      var id = req.params.id;
      Client.findOne({_id : id},function(err, client) {
          if (err){
            res.send(err);
          }else{
            res.json(client);
          }
      });
  };

  this.updateClients = function (req, res) {
      var id = req.params.id;
      Client.findOneAndUpdate(
        {_id: id},
        {$set:{ nom:req.body.nom,
                prenom:req.body.prenom,
                dateNaissance:req.body.dateNaissance,
                adresse:req.body.adresse,
                nationalite:req.body.nationalite,
                numPermis:req.body.numPermis,
                datePermis:req.body.datePermis,
                email:req.body.email}},
        function (err, doc) {
            if (err){
              res.send(err);
            }else{
              res.json(doc);
            }
        });
  };
};
