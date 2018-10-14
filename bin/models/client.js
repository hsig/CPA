// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var clientSchema = new mongoose.Schema({
  nom : {
    type: String,
    required: true
    },
  prenom: {
    type: String,
    required: true
    },
  dateNaissance: {
    type: Date,
    required: true
    },
  nationalite: {
    type: String,
    required: true
    },
  numPermis: {
    type: String,
    unique: true,
    required: true
    },
  datePermis: {
    type: Date,
    required: true
    },
  adresse: {
    type: String,
    required: true
    },
  email: {
    type: String,
    required: true
    },
});

// Export the Mongoose model
module.exports = mongoose.model('Client', clientSchema);
