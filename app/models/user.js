var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  timestamps: {type: Date, default: Date.now}   
});

usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });  
};

usersSchema.methods.hashPassword = function(password) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(password, null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

var User = db.model('User', usersSchema);

module.exports = User;
