'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var tv = require('./tv');
app.set('port', 5000);

app.engine('html', require('ejs').renderFile);
app.set('views', 'views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));

app.post('/watch', function (req, res, next) {
    var watch = tv.watchShort;
    if (!!req.body.watchLong) {
        watch = tv.watchLong;
    }

    watch(req.body.videoUrl, function (err) {
        if (err) {
            return next(err)
        }
        res.json({});
    });
});

app.post('/off', function (req, res, next) {
    tv.off(function () {
        res.json({});
    })
});

app.get('/', function (req, res, next) {
    return res.render('index');
});

app.use(function (err, req, res, next) {
    if (err && err.message) {
        var msg = err.message;
        if (err.message === "INVALID_URL") {
            msg = "Invalid URL, did you include http://?";
        }
        return res.status(400).send(msg)
    }
    else {
        return res.status(500).send('Internal Server Error')
    }
});

app.listen(app.get('port'), function () {
    console.log('PiTV server listening on port ' + app.get('port') + '.');
});