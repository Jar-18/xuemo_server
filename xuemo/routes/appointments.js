var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  var orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
  var courseId = req.query.courseId;
  if (courseId == null) {
    res.send("Not support");
    return;
  }
  models.Appointment.findAll({
    where: {
      CourseId: courseId
    },
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
    order: orderBy,
    attributes: ['updatedAt'],
    include: [{
      model: models.User,
      as: "applicant",
      attributes: ['id', 'nickname', 'portrait', 'gender', 'age']
    }]
  }).then(function(courseAppointments) {
    res.json(courseAppointments);
  });
});

router.get('/:courseRatingId', function(req, res) {
  res.send("Not support");
})

module.exports = router;