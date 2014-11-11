'use strict';

var express = require('express');
var app = module.exports.app = exports.app = express();

app.use(require('connect-livereload')());

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/src'));
//app.use(express.static('src'));

var server = app.listen(3030, function () {
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s',port);
});
