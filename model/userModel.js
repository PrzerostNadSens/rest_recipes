
var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    subname: {
        type: String,
        required: true
    },
    administrator: Boolean,
    phone: {
        type: Number,
        min: 9,
        index: { unique: true }
    },
    mail: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };