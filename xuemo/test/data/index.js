var models = require("../../models");
var data = require("./data.json");

exports.createInitData = function() {
  return models.sequelize.sync({
      force: true
    })
    .success(function() {
      new models.Sequelize.Utils.QueryChainer()
        .add(models.District.bulkCreate(data.districts))
        .add(models.Category.bulkCreate(data.categories))
        .run()
        .then(function() {
          new models.Sequelize.Utils.QueryChainer()
            .add(models.User.bulkCreate(data.users))
            .run()
            .then(function() {
              new models.Sequelize.Utils.QueryChainer()
                .add(models.Course.bulkCreate(data.courses))
                .run()
                .then(function() {
                  new models.Sequelize.Utils.QueryChainer()
                    .add(models.CourseDistrict.bulkCreate(data.courseDistricts))
                    .add(models.CoursePic.bulkCreate(data.coursePics))
                    .add(models.CourseType.bulkCreate(data.courseTypes))
                    .add(models.CourseSite.bulkCreate(data.courseSites))
                    .add(models.CourseRating.bulkCreate(data.courseRatings))
                    .add(models.Appointment.bulkCreate(data.appointments))
                    .run();
                });
            });
        });
    });
}