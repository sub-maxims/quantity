var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());

module.exports = app;