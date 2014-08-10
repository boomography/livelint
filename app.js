var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var recess = require('recess');
var unorm = require('unorm');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// test recess functionality
recess('./test.css', { compile: false}, function (err, obj) {
  if (err) throw err;
  for (var i=0; i<obj.length; i++) {
    for (var z=0; i<obj[i].definitions.length; z++) {
      if (obj[i].definitions[z] !== undefined) {
        obj[i].definitions[z].errors.forEach(function(error){
          // console.log(unorm.nfd(error.type));
          console.log(unorm.nfd(error.message));
          if(error.extract !== undefined) console.log(unorm.nfd(error.extract));
          console.log('');
        });
      }
    }
  }
});

module.exports = app;
