// Load required packages
var mongoose = require('mongoose');

// Define our contract schema
var ContratsSchema   = new mongoose.Schema(
  {
      clientNom : {
        type: String,
        required: true
      },
      clientNomSup : {
        type: String
      },
      voitureImm : {
        type: String,
        required: true
      },
      dateDebut: {
        type: Date,
        required: true
      },
      dateFin: {
        type: Date,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      client     : [mongoose.Schema.Types.Mixed],
      clientSup  : [mongoose.Schema.Types.Mixed],
      voiture    : [mongoose.Schema.Types.Mixed],
      params     : [mongoose.Schema.Types.Mixed]

  },
  {
    timestamps: true
  });

// Export the Mongoose model
module.exports = mongoose.model('Contrat', ContratsSchema);
