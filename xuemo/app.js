var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cors = require('cors');

var multer = require('multer');

//qiniu
var qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = '_4ALATdVq5H3aEzCAK7OzF19z4mVXCzIhrotqMTp';
qiniu.conf.SECRET_KEY = 'IjZp-7-tMvc5gxKwtDKyWCw9sAuuBrW3nmApqLaD';

var routes = require('./routes/index');
var users = require('./routes/users');
var categories = require('./routes/categories');
var districts = require('./routes/districts');
var courses = require('./routes/courses');
var courseRatings = require('./routes/courseRatings');
var appointments = require('./routes/appointments');
var photos = require('./routes/photos');
var activities = require('./routes/activities');

var files = require('./routes/files');

var models = require("./models");

var app = express();

//for corss domain issue
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

// app.use(bodyParser({
//     uploadDir: __dirname + '/uploads',
//     keepExtensions: true
// }));
// app.use(express.methodOverride());

app.use(multer({
  dest: './uploads/'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/categories', categories);
app.use('/districts', districts);
app.use('/courses', courses);
app.use('/courseRatings', courseRatings);
app.use('/appointments', appointments);
app.use('/photos', photos);
app.use('/activities', activities);

app.use('/files', files);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

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

//create clean sample data every time
var data = require('./test/data');
var LBSData = require('./test/data/LBS');
data.createInitData()
  .then(function() {
    LBSData.createInitData();
  });


module.exports = app;