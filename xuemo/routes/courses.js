var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
    var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
    var orderBy = req.query.orderBy = null ? 'createdAt DESC' : req.query.orderBy;
    var simple = req.query.simple == null ? false : (req.query.simple == 'true' ? true : false);
    var exceptCourseId = req.query.exceptCourseId;
    var teacherId = req.query.teacherId;

    var wherePart = {};
    if (exceptCourseId != null) {
      wherePart.id = {
        $ne: exceptCourseId
      };
    }
    if (teacherId != null) {
      wherePart.teacherId = teacherId;
    }

    models.Course.findAll({
      where: wherePart,
      attributes: simple == true ? ['id', 'title', 'price', 'status', 'rating', 'ratingCount', 'teacherId', 'categoryId', 'createdAt'] : ['id', 'title', 'price', 'status', 'rating', 'ratingCount', 'describe', 'teacherId', 'categoryId', 'createdAt'],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      order: orderBy,
      include: [{
          model: models.User,
          as: "teacher",
          attributes: ['id', 'nickname', 'gender', 'age']
        }, {
          model: models.Category,
          as: "category",
          attributes: ['id', 'name']
        }, {
          model: models.District,
          as: "districts",
          attributes: ['id', 'name', 'fullName']
        }, {
          model: models.CoursePic,
          as: "pics",
          attributes: ['name']
            // attributes: Object.keys(models.CoursePic.attributes).concat([
            //     [models.sequelize.literal('(SELECT TOP 1 "name" FROM "CoursePics" WHERE "Course"."id" = "CoursePics"."courseId")'), 'name']
            // ])
        }, {
          model: models.CourseType,
          as: "types",
          attributes: ['id']
        }, {
          model: models.CourseSite,
          as: "sites",
          attributes: ['id']
        }
        // {
        //   model:models.CourseRating,
        //   as: "ratings",
        //   attributes: [
        //     [models.sequelize.fn('COUNT', 'rating'), 'RatingCount'],
        //     [models.sequelize.fn('SUM', 'rating'), 'RatingSum']
        //   ],
        //   group: ['CourseId']
        // }
      ],
    }).then(function(courses) {
      res.json(courses);
    });
  })
  .post('/', function(req, res) {
    //transaction
    console.log(req.body);

    models.sequelize.transaction(function(t) {
      return models.Course.create({
        title: req.body.title,
        price: req.body.price,
        describe: req.body.describe,
        teacherId: req.body.teacher.id,
        categoryId: req.body.category.id,
      }, {
        transaction: t
      }).then(function(course) {
        //Temp
        courseId = course.id;
        var promiseArr = [];
        var sites = req.body.sites;
        if (sites != null) {
          console.log(""+sites);
          sites.forEach(function(site) {
            promiseArr.push(models.CourseSite.create({
              id: site.id,
              courseId: course.id
            }, {
              transaction: t
            }));
          });
        }
        var types = req.body.types;
        if (types != null) {
          types.forEach(function(type) {
            promiseArr.push(models.CourseType.create({
              id: type.id,
              courseId: course.id
            }, {
              transaction: t
            }));
          });
        }
        var districts = req.body.districts;
        if (districts != null) {
          districts.forEach(function(district) {
            promiseArr.push(models.CourseDistrict.create({
              CourseId: course.id,
              DistrictId: district.id
            }, {
              transaction: t
            }));
          })
        }
        return models.sequelize.Promise.all(promiseArr);
      });
    }).then(function(result) {
      res.status(201).json({
        status: "Success",
        courseId: courseId
      });
    }).catch(function(err) {
      res.status(500).json({
        err: ""+err
      });
    });
  });

router.get('/:courseId', function(req, res) {
    var courseId = req.params.courseId;
    models.Course.find({
      where: {
        id: courseId
      },
      attributes: [
        'id', 'title', 'price', 'status', 'rating', 'ratingCount', 'describe', 'teacherId', 'categoryId',
      ],
      include: [{
        model: models.User,
        as: "teacher",
        attributes: ['id', 'nickname', 'gender', 'age', 'portrait', 'motto']
      }, {
        model: models.Category,
        as: "category",
        attributes: ['id', 'name']
      }, {
        model: models.District,
        as: "districts",
        attributes: ['id', 'name', 'fullName']
      }, {
        model: models.CoursePic,
        as: "pics",
        attributes: ['name'],
      }, {
        model: models.CourseType,
        as: "types",
        attributes: ['id']
      }, {
        model: models.CourseSite,
        as: "sites",
        attributes: ['id']
      }]
    }).then(function(courses) {
      res.json(courses);
    });
  })
  .put('/:courseId', function(req, res) {
    models.sequelize.transaction(function(t) {
        return models.Course.find({
            where: {
              id: req.params.courseId
            }
          }, {
            transaction: t
          })
          .then(function(course) {
            var promiseArr = [];
            promiseArr.push(course.updateAttributes({
                describe: req.body.describe
              }, {
                transaction: t
              }));
            var pics = req.body.pics;
            if (pics != null) {
              pics.forEach(function(pic) {
                promiseArr.push(models.CoursePic.create({
                  courseId: req.params.courseId,
                  name: pic.id
                  }, {
                    transaction: t
                  }));
              });
            }
            return models.sequelize.Promise.all(promiseArr);
          });
      })
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
  var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  var orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
  var courseId = req.params.courseId;
  if (courseId == null) {
    res.send("Not support");
    return;
  }
  models.CourseRating.findAll({
    where: {
      CourseId: courseId
    },
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
    order: orderBy,
    attributes: ['rating', 'comment', 'updatedAt'],
    include: [{
      model: models.User,
      as: "commentator",
      attributes: ['id', 'nickname', 'portrait']
    }]
  }).then(function(courseRatings) {
    res.json(courseRatings)
  });
}).post('/:courseId/courseRatings', function(req, res) {
  models.sequelize.transaction(function(t) {
    return models.CourseRating.create({
      rating: req.body.rating,
      comment: req.body.comment,
      CourseId: req.params.courseId,
      commentatorId: req.body.commentatorId
    }, {
      transaction: t
    }).then(function(courseRating) {
      //Update average rating for a course
      return models.CourseRating.sum('rating', {
        where: {
          CourseId: req.params.courseId
        }
      }, {
        transaction: t
      }).then(function(originalRatingSum) {
        return models.CourseRating.count({
          where: {
            CourseId: req.params.courseId
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
      err: ''+err
    });
  });
});

router.get('/:courseId/appointments', function(req, res) {
  var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  var orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
  var courseId = req.params.courseId;
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

module.exports = router;