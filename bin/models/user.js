// Load required packages
var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt');

// Define our user schema
var UserSchema   = new mongoose.Schema({
  name: {
       type: String,
       unique: true,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   role: {
     type: String,
     required: true
   }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
