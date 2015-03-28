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
var courseRatings = require('./routes/courseRatings');

var models = require("./models");

//create clean test data every time
initTestData();

var app = express();

//for corss domain issue
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
app.use('/courseRatings', courseRatings);

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

function initTestData() {
  models.sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
.then(function() {
  //sync method create tables
  return models.sequelize.sync({force: true}).success(function() {
  console.log("-----Cleaned and recreated database tables...");

  //Create test 
  var data = [];

  var u = [];
  data.push(u);
  u[0] = models.User.build({nickname: "Jar", gender: 1, age: 22, portrait: "jar.jpg"});
  u[1] = models.User.build({nickname: "Alice", gender: 0, age: 18, portrait: "alice.jpg"});

  var d = [];
  data.push(d);
  d[0] = models.District.build({id:1, code: "01", name: "中国", fullName: "中国"});
  d[1] = models.District.build({id:2, code: "0101", name: "上海", fullName: "中国-上海"});
  d[2] = models.District.build({id:3, code: "0102", name: "四川", fullName: "中国-四川"});
  d[3] = models.District.build({id:4, code: "010101", name: "浦东新区", fullName: "中国-上海-浦东新区"});
  d[4] = models.District.build({id:5, code: "010102", name: "静安区", fullName: "中国-上海-静安区"});

  var ca = [];
  data.push(ca);
  ca[0] = models.Category.build({id:1, code: "01", name: "语言"});
  ca[1] = models.Category.build({id:2, code: "02", name: "运动"});
  ca[2] = models.Category.build({id:3, code: "0101", name: "英语"});
  ca[3] = models.Category.build({id:4, code: "0102", name: "法语"});
  ca[4] = models.Category.build({id:5, code: "0201", name: "羽毛球"});

  var co = [];
  data.push(co);
  co[0] = models.Course.build({id:1, title:"教英语，包教包会", price:100, status: 1, teacherId: 1, categoryId: 3, rating:4.0, ratingAmount: 3, type:1, site:1, 
    describle:"我也不知道写什么描述啊，我教英语。我也不知道写什么描述啊，我教英语。我也不知道写什么描述啊，我教英语。我也不知道写什么描述啊，我教英语。我也不知道写什么描述啊，我教英语。"});
  co[1] = models.Course.build({id:2, title:"本人教过很多高三学生去法国", price:200, status: 2, teacherId: 1, categoryId: 4, rating:3.5, ratingAmount: 5, type:2, site:2, 
    describle:"我法语教的还可以。我法语教的还可以。我法语教的还可以。我法语教的还可以。我法语教的还可以。我法语教的还可以。我法语教的还可以。我法语教的还可以。我法语教的还可以。我法语教的还可以。"});
  co[2] = models.Course.build({id:3, title:"业余时间教羽毛球", price:180, status: 1, teacherId: 1, categoryId: 5, rating:3.7, ratingAmount: 3, type:3, site:3, 
    describle:"教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。教羽毛球。"});
  co[3] = models.Course.build({id:4, title:"英语从此不再难", price:80, status: 1, teacherId: 2, categoryId: 3, rating:4.6, ratingAmount: 8, type:3, site:3, 
    describle:"Learn English.Learn English.Learn English.Learn English.Learn English.Learn English.Learn English.Learn English.Learn English.Learn English.Learn English."});

  var cp = [];
  data.push(cp);
  cp[0] = models.CoursePic.build({id: 1, name: "english.jpg"});
  cp[1] = models.CoursePic.build({id: 2, name: "french.jpg"});
  cp[2] = models.CoursePic.build({id: 3, name: "badminton.jpg"});
  cp[3] = models.CoursePic.build({id: 4, name: "english2.jpg"});
  cp[4] = models.CoursePic.build({id: 5, name: "english3.jpg"});
  cp[5] = models.CoursePic.build({id: 6, name: "english4.jpg"});

  var cr = [];
  data.push(cr);
  cr[0] = models.CourseRating.build({id:1, rating: 4, comment:"教的还过得去"});
  cr[1] = models.CourseRating.build({id:2, rating: 4.6, comment:"人很好"});
  cr[2] = models.CourseRating.build({id:3, rating: 5, comment:"这是我见过的最好的老师"});

  var chainer = new models.Sequelize.Utils.QueryChainer;

  //Some blogs say using FOR is faster
  data.forEach(function(category) {
    category.forEach(function(item) {
      chainer.add(item.save());
    });
  });

  //Create more courses
  for(var i = 0;i < 10;i++) {
      var index = 4 + i;
      co[index] = models.Course.build({id:index + 1, title:"更多的课程测试分页", price:100, status: 1, teacherId: 1, categoryId: 3, rating:4.0, ratingAmount: 5, type:1, site:1, describle:"就是没有描述。"});
      chainer.add(co[index].save());
  }


  chainer.run().then(function() {
    console.log("-----Creating relatioships...");
    u[1].setRatings([cr[0],cr[1],cr[2]]);
    d[0].setParent(d[0]);
    d[1].setParent(d[0]);
    d[2].setParent(d[0]);
    d[3].setParent(d[1]);
    d[4].setParent(d[1]);
    ca[0].setParent(ca[0]);
    ca[1].setParent(ca[1]);
    ca[2].setParent(ca[0]);
    ca[3].setParent(ca[0]);
    ca[4].setParent(ca[1]);
    co[0].setTeacher(u[0]);
    co[1].setTeacher(u[0]);
    co[2].setTeacher(u[0]);
    co[3].setTeacher(u[1]);
    co[0].setCategory(ca[2]);
    co[0].setCategory(ca[3]);
    co[0].setCategory(ca[4]);
    co[0].setCategory(ca[2]);
    co[0].setDistricts([d[3],d[4]]);
    co[1].setDistricts([d[3]]);
    co[2].setDistricts([d[4]]);
    co[3].setDistricts([d[1],d[2]]);
    co[0].setPics([cp[0],cp[3],cp[4]]);
    co[1].setPics([cp[1]]);
    co[2].setPics([cp[2]]);
    co[3].setPics([cp[5]]);
    co[0].setRatings([cr[0],cr[1]]);
    co[1].setRatings([cr[2]]);
    //Create more courses
    for(var i = 0;i < 10;i++) {
      var index = 4 + i;
      co[index].setTeacher(u[0]);
      co[index].setCategory(ca[3]);
      co[index].setDistricts([d[3]]);
    }
  });
})
})
.then(function() {
  return models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
});
}

