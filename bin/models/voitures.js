// Load required packages
var mongoose = require('mongoose');
/*var validateImmatriculation = function(immatriculation) {
    var re = /^[0-9]{1,4} (TN) [0-9]{1,4}$/;
    return re.test(immatriculation)
};*/

// Define our voitures schema
var VoituresSchema   = new mongoose.Schema({
  immatriculation : {
    unique: true,
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{1,4} (TN) [0-9]{1,4}$/.test(v);
      },
      message: '{VALUE} is not a Imm address or exist'
    },
  },
  model: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  km: {
    type: Number,
    required: true
  },
  used : {
    type: Boolean,
    default: false
  },
  used_type : {
    type: String,
    default: 'showroom'
  }
});

VoituresSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

// Export the Mongoose model
module.exports = mongoose.model('Voiture', VoituresSchema);
