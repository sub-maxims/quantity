var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use('/api/messenger', require('../services/fb-messenger/route'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;