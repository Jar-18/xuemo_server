var models = require('../models');
var express = require('express');
var router = express.Router();

var appointmentService = require('../service/appointment');

router.get('/', function(req, res, next) {
    var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
    var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
    var orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
    var courseId = req.query.courseId;
    var userId = req.query.userId;
    var param = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      orderBy: orderBy,
    };
    if (courseId == null && userId == null) {
      res.send("Not support");
      return;
    }
    if (courseId) {
      models.Appointment.findAll({
        where: {
          courseId: courseId
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
    }
    if(userId) {
      appointmentService.findAllByUserId(userId, param)
        .then(function(appointments) {
          res.json(appointments);
        });
    }
  })
  .post('/', function(req, res) {
    if (req.body.applicantId == null || req.body.courseId == null) {
      res.json('Parameter error');
      return;
    }
    appointmentService.createAppointment(req.body.courseId, req.body.applicantId)
      .then(function(appointment) {
        res.status(201).json({
          appointmentId: appointment.id,
          status: "Success"
        });
      })
      .catch(function() {

      });
  });

router.get('/:courseRatingId', function(req, res) {
  res.send("Not support");
})

module.exports = router;