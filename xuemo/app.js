var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var categories = require('./routes/categories');

var models = require("./models");
models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
.then(function() {
  return models.sequelize.sync({force: true}).success(function() {
  console.log("-----Cleaned and recreated database tables...");
  models.User.bulkCreate([
    {nickname: "Jar", gender: 1, age: 22},
    {nickname: "Alice", gender: 0, age: 18},
  ]).then(function() {
    console.log("-----Created Users...");
  });
  models.District.bulkCreate([
    {id:1, parentId: 1, code: "01", name: "中国", full_name: "中国"},
    {id:2, parentId: 1, code: "0101", name: "上海", full_name: "中国-上海"},
    {id:3, parentId: 1, code: "0102", name: "四川", full_name: "中国-四川"},
    {id:4, parentId: 2, code: "010101", name: "浦东新区", full_name: "中国-上海-浦东新区"},
    {id:5, parentId: 2, code: "010102", name: "静安区", full_name: "中国-上海-静安新区"},
  ]).then(function() {
    console.log("-----Created Districts...");
  });
  models.Category.bulkCreate([
    {id:1, parentId: 1, code: "01", name: "语言"},
    {id:2, parentId: 2, code: "02", name: "运动"},
    {id:3, parentId: 1, code: "0101", name: "英语"},
    {id:4, parentId: 1, code: "0102", name: "法语"},
    {id:5, parentId: 2, code: "0201", name: "羽毛球"},
  ]).then(function() {
    console.log("-----Created Categories...");
  });
  models.Course.bulkCreate([
    {title:"教英语，包教包会", salary:100, status: 1, teacherId: 1, categoryId: 3},
    {title:"本人教过很多高三学生去法国", salary:200, status: 2, teacherId: 1, categoryId: 4},
    {title:"业余时间教羽毛球", salary:180, status: 1, teacherId: 1, categoryId: 5},
    {title:"英语从此不再难", salary:80, status: 1, teacherId: 2, categoryId: 3},
  ]).then(function() {
    console.log("-----Created Courses...");
  });
})
})
.then(function() {
  return models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
});
  

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/categories', categories);

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


module.exports = app;

