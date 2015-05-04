var models = require("../../models");
var data = require("./data.json");

exports.createInitData = function() {
  return models.sequelize.sync({
      force: true
    })
    .success(function() {
      return models.District.bulkCreate(data.districts);
    })
    .then(function() {
      return models.Category.bulkCreate(data.categories);
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
      return models.Follower.bulkCreate(data.followers);
    });
}