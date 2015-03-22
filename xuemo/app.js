var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');
var categories = require('./routes/categories');
var districts = require('./routes/districts');
var courses = require('./routes/courses');

var models = require("./models");
models.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
.then(function() {
  //sync method create tables
  return models.sequelize.sync({force: true}).success(function() {
  console.log("-----Cleaned and recreated database tables...");

  //Create test data
  var u1 = models.User.build({nickname: "Jar", gender: 1, age: 22});
  var u2 = models.User.build({nickname: "Alice", gender: 0, age: 18});

  var d1 = models.District.build({id:1, code: "01", name: "中国", fullName: "中国"});
  var d2 = models.District.build({id:2, code: "0101", name: "上海", fullName: "中国-上海"});
  var d3 = models.District.build({id:3, code: "0102", name: "四川", fullName: "中国-四川"});
  var d4 = models.District.build({id:4, code: "010101", name: "浦东新区", fullName: "中国-上海-浦东新区"});
  var d5 = models.District.build({id:5, code: "010102", name: "静安区", fullName: "中国-上海-静安区"});

  var ca1 = models.Category.build({id:1, code: "01", name: "语言"});
  var ca2 = models.Category.build({id:2, code: "02", name: "运动"});
  var ca3 = models.Category.build({id:3, code: "0101", name: "英语"});
  var ca4 = models.Category.build({id:4, code: "0102", name: "法语"});
  var ca5 = models.Category.build({id:5, code: "0201", name: "羽毛球"});

  var co1 = models.Course.build({id:1, title:"教英语，包教包会", price:100, status: 1, teacherId: 1, categoryId: 3, rating:4.0});
  var co2 = models.Course.build({id:2, title:"本人教过很多高三学生去法国", price:200, status: 2, teacherId: 1, categoryId: 4, rating:3.5});
  var co3 = models.Course.build({id:3, title:"业余时间教羽毛球", price:180, status: 1, teacherId: 1, categoryId: 5, rating:3.7});
  var co4 = models.Course.build({id:4, title:"英语从此不再难", price:80, status: 1, teacherId: 2, categoryId: 3, rating:4.6});

  var cp1 = models.CoursePic.build({id: 1, name: "english.jpg"});
  var cp2 = models.CoursePic.build({id: 2, name: "french.jpg"});
  var cp3 = models.CoursePic.build({id: 3, name: "badminton.jpg"});
  var cp4 = models.CoursePic.build({id: 4, name: "english.jpg"});

  var chainer = new models.Sequelize.Utils.QueryChainer;

  chainer.add(u1.save());
  chainer.add(u2.save());
  chainer.add(d1.save());
  chainer.add(d2.save());
  chainer.add(d3.save());
  chainer.add(d4.save());
  chainer.add(d5.save());
  chainer.add(ca1.save());
  chainer.add(ca2.save());
  chainer.add(ca3.save());
  chainer.add(ca4.save());
  chainer.add(ca5.save());
  chainer.add(co1.save());
  chainer.add(co2.save());
  chainer.add(co3.save());
  chainer.add(co4.save());
  chainer.add(cp1.save());
  chainer.add(cp2.save());
  chainer.add(cp3.save());
  chainer.add(cp4.save());
  chainer.runSerially().then(function() {
    console.log("-----Creating relatioships...");
    d1.setParent(d1);
    d2.setParent(d1);
    d3.setParent(d1);
    d4.setParent(d2);
    d5.setParent(d2);
    ca1.setParent(ca1);
    ca2.setParent(ca2);
    ca3.setParent(ca1);
    ca4.setParent(ca1);
    ca5.setParent(ca2);
    co1.setTeacher(u1);
    co2.setTeacher(u1);
    co3.setTeacher(u1);
    co4.setTeacher(u2);
    co1.setCategory(ca3);
    co1.setCategory(ca4);
    co1.setCategory(ca5);
    co1.setCategory(ca3);
    co1.setDistricts([d4,d5]);
    co2.setDistricts([d4]);
    co3.setDistricts([d5]);
    co4.setDistricts([d2,d3]);
    co1.addPics(cp1);
    co2.addPics(cp2);
    co3.addPics(cp3);
    co4.addPics(cp4);
  });
})
})
.then(function() {
  return models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
});

var app = express();

app.use(cors());



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
app.use('/districts', districts);
app.use('/courses', courses);

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

