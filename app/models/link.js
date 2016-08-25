var db = require('../config');

var Link = mongoose.model('Link', urlsSchema);

module.exports = Link;
