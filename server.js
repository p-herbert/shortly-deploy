var app = require('./server-config.js');

var port = 4568;

app.listen(env.proccess.PORT || port);

console.log('Server now listening on port ' + port);
