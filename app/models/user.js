var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.model('User', db.usersSchema);

module.exports = User;
