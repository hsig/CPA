// Load required packages
var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
// Define our contract schema
var FacturesSchema   = new mongoose.Schema(
  {
      clientNom : {
        type: String,
        required: true
        },
      num_facture : {
        type: Number,
        unique: true,
        required: true
        },
      date_facture : {
        type: Date,
        required: true
        },
      date_echeance: {
        type: Number,
        required: true
        },
      date_livraison: {
        type: Date,
        required: true
        },
      notes: {
        type: String
        },
      amount: {
        type: String
      },
      article : [mongoose.Schema.Types.Mixed]
  },
  {
      timestamps: true
  });

// Export the Mongoose model
module.exports = mongoose.model('Facture', FacturesSchema);
