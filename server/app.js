var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var config = require('./config');
var MongoClient = require('mongodb').MongoClient;

var promise = MongoClient.connect(config.db.url).then(db => {

    var messageService = require('./services/message-service').create(db);

    var index = require('./ctrls/index-ctrl').router();
    var messages = require('./ctrls/message-ctrl').router(messageService);
    app.use([ index, messages ]);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {

        var message = 'Unknown';
        var status = 500;
        var stack = undefined;
        if (err.status) {
            status = err.status;
            if (err.message) {
                message = err.message;
            }
        }
        if (req.app.get('env') === 'development') {
            stack = err.stack;
        }

        res.status(status);
        if (req.accepts('html', 'json') === 'json') {
            var ret = { error : message };
            if (stack) {
                ret.stack = stack;
            }
            return res.json(ret);
        }

        res.locals.status = status;
        res.locals.error = message;
        res.locals.stack = stack;
        res.render('error');
    });

    return app;
});

module.exports = promise;