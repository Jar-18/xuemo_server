var models = require("../../models");
var data = require("./data.json");

var districts = require("./districts.json");
var categories = require("./category.json");

var rc = require('redis').createClient();

exports.createInitData = function() {

  rc.flushdb();

  return models.sequelize.sync({
      force: true
    })
    .success(function() {
      return models.District.bulkCreate(districts);
    })
    .then(function() {
      return models.Category.bulkCreate(categories);
    })
    .then(function() {
      return models.User.bulkCreate(data.users);
    })
    .then(function() {
      return models.Course.bulkCreate(data.courses);
    })
    .then(function() {
      return models.CourseDistrict.bulkCreate(data.courseDistricts);
    })
    .then(function() {
      return models.CoursePic.bulkCreate(data.coursePics);
    })
    .then(function() {
      return models.CourseType.bulkCreate(data.courseTypes);
    })
    .then(function() {
      return models.CourseSite.bulkCreate(data.courseSites);
    })
    .then(function() {
      return models.CourseRating.bulkCreate(data.courseRatings);
    })
    .then(function() {
      return models.Appointment.bulkCreate(data.appointments);
    })
    .then(function() {
      return models.Activity.bulkCreate(data.activities);
    })
    .then(function() {
      return models.ActivityPic.bulkCreate(data.activityPics);
    });
}