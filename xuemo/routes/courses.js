var models = require('../models');
var express = require('express');
var router = express.Router();

var courseService = require("../service/course");
var courseRatingService = require("../service/courseRating");
var appointmentService = require("../service/appointment");

router.get('/', function(req, res, next) {
    var params = {};
    params.pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
    params.pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
    params.orderBy = req.query.orderBy = null ? 'latest' : req.query.orderBy;
    params.simple = req.query.simple == null ? false : (req.query.simple == 'true' ? true : false);
    params.exceptCourseId = req.query.exceptCourseId;
    params.teacherId = req.query.teacherId;
    params.districtId = req.query.districtId;
    params.categoryId = req.query.categoryId;

    courseService.findCourseList(params)
      .then(function(coursesWithCount) {
        res.set({
          'X-Total-Count': coursesWithCount.count
        });
        res.json(coursesWithCount.courses);
      })
      .catch(function(err) {
        
      });
  })
  .post('/', function(req, res) {
    var params = {};
    params.title = req.body.title;
    params.price = req.body.price;
    params.describe = req.body.describe;
    params.teacher = req.body.teacher;
    params.category = req.body.category;
    params.sites = req.body.sites;
    params.types = req.body.types;
    params.districts = req.body.districts;
    courseService.createCourse(params)
      .then(function(courseId) {
        res.status(201).json({
          status: "Success",
          courseId: courseId
        });
      }).catch(function(err) {
        res.status(500).json({
          err: "" + err
        });
      });
  });

router.get('/:courseId', function(req, res) {
    var courseId = req.params.courseId;
    var params = {
      userId: req.query.userId
    };

    courseService.findCourseById(courseId, params)
      .then(function(course) {
        res.json(course);
      });
  })
  .put('/:courseId', function(req, res) {
    var params = {};
    params.courseId = req.params.courseId;
    params.describe = req.body.describe;
    params.pics = req.body.pics;
    courseService.updateCourse(params)
      .then(function(result) {
        res.status(201).json({
          status: 'Success'
        });
      })
      .catch(function(err) {
        res.status(500).json({
          err: err
        });
      });
  });

router.get('/:courseId/courseRatings', function(req, res) {
  var params = {};
  params.pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  params.pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  params.orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
  var courseId = req.params.courseId;
  if (courseId == null) {
    res.send("Not support");
    return;
  }
  courseRatingService.findAllByCourseId(courseId, params)
    .then(function(courseRatings) {
      res.json(courseRatings)
    });
}).post('/:courseId/courseRatings', function(req, res) {
  models.sequelize.transaction(function(t) {
    return models.CourseRating.create({
      rating: req.body.rating,
      comment: req.body.comment,
      courseId: req.params.courseId,
      commentatorId: req.body.commentatorId
    }, {
      transaction: t
    }).then(function(courseRating) {
      //Update average rating for a course
      return models.CourseRating.sum('rating', {
        where: {
          courseId: req.params.courseId
        }
      }, {
        transaction: t
      }).then(function(originalRatingSum) {
        return models.CourseRating.count({
          where: {
            courseId: req.params.courseId
          }
        }, {
          transaction: t
        }).then(function(ratingCount) {
          console.log("count " + ratingCount);
          console.log("sum " + originalRatingSum);
          return models.Course.find({
            id: req.params.courseId
          }, {
            transaction: t
          }).then(function(course) {
            var originalRatingSumNum = (isNaN(originalRatingSum) ? 0 : originalRatingSum);
            return course.updateAttributes({
              rating: (originalRatingSumNum + courseRating.rating) / (ratingCount + 1),
              ratingCount: (ratingCount + 1)
            }, {
              transaction: t
            });
          });
        });
      });
    });
  }).then(function(result) {
    res.status(201).json({
      status: 'Success'
    });
  }).catch(function(err) {
    res.status(500).json({
      err: '' + err
    });
  });
});

router.get('/:courseId/appointments', function(req, res) {
  var params = {};
  params.pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  params.pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  params.orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
  var courseId = req.params.courseId;
  if (courseId == null) {
    res.send("Not support");
    return;
  }
  appointmentService.findAllByCourseId(courseId, params)
    .then(function(courseAppointments) {
      res.json(courseAppointments);
    });
});

module.exports = router;