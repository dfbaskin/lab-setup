
var fs = require('fs');
var opn = require('opn');
var express = require('express');
var bodyParser = require('body-parser')

var portNum = 9999;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    console.log("%s %s", req.method, req.path);
    next();
});

app.get('/my-lab-keys', function(req, res) {
    fs.readFile('myLabKeys.json', function(err, content) {
        if(err) {
            return res.status(500).json(err);
        }
        try {
            var jsonObj = JSON.parse(content.toString());
            res.json(jsonObj);
        }
        catch(parseErr) {
            res.status(500).json(parseErr);
        }
    });
});

app.post('/my-lab-keys', function(req, res) {
    fs.readFile('myLabKeys.json', function(err, content) {
        if(err) {
            return res.status(500).json(err);
        }
        var jsonObj;
        try {
            jsonObj = JSON.parse(content.toString());
        }
        catch(parseErr) {
            return res.status(500).json(parseErr);
        }

        jsonObj.azure.key1 = req.body.key1;
        jsonObj.azure.key2 = req.body.key2;
        var jsonContent = JSON.stringify(jsonObj, null, 2);
        fs.writeFile('myLabKeys.json', jsonContent, function(err) {
            if(err) {
                return res.status(500).json(err);
            }
            res.redirect('/keys.html');
        });
    });
});

app.use(express.static('src'));

var server = app.listen(portNum, function () {
    console.log('Application is listening at http://localhost:%s', portNum);
});

opn('http://localhost:9999/');
