var db = require('../config');
var bcrypt = require('bcrypt-nodejs');

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

var Link = mongoose.model('Link', urlsSchema);

module.exports = Link;
