
var express = require('express');
var app = express();
var portNum = 9999;

app.use(function(req, res, next) {
    console.log("%s %s", req.method, req.path);
    next();
});

app.use(express.static('src'));

var server = app.listen(portNum, function () {
    console.log('Application is listening at http://localhost:%s', portNum);
});

