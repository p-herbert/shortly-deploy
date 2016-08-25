var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {

  var urlsSchema = new mongoose.Schema({
    url: String,
    baseUrl: String,
    code: String,
    title: String,
    visits: {type: Number, default: 0},
    timestamps: {type: Date, default: Date.now}
  });

  urlsSchema.methods.generateCode = function(url) {
    var shasum = crypto.createHash('sha1');
    shasum.update(this.get('url'));
    this.set('code', shasum.digest('hex').slice(0, 5));
  };

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

});

db.connect('mongodb://' + 'localhost:' + '27017' + '/db');

module.exports = db;








/*
var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});


var Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});*/


/*var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});*/

