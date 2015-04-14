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
  if(exceptCourseId != null) {
    wherePart.id = {$ne: exceptCourseId};
  }
  if(teacherId != null) {
    wherePart.teacherId = teacherId;
  }

  models.Course.findAll({
    where: wherePart,
    attributes: simple == true ? ['id', 'title', 'price', 'status', 'rating','teacherId', 'categoryId', 'createdAt']
      : ['id', 'title', 'price', 'status', 'rating', 'describe', 'teacherId', 'categoryId', 'createdAt'],
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
    order: orderBy,
  	include: [
  		{
  			model:models.User,
  			as: "teacher",
        attributes: ['id', 'nickname', 'gender', 'age']
  		},
  		{
  			model:models.Category,
  			as: "category",
        attributes: ['id', 'name']
  		},
  		{
  			model:models.District,
  			as: "districts",
        attributes: ['id', 'name', 'fullName']
  		},
      {
        model:models.CoursePic,
        as: "pics",
        attributes: ['name']
        // attributes: Object.keys(models.CoursePic.attributes).concat([
        //     [models.sequelize.literal('(SELECT TOP 1 "name" FROM "CoursePics" WHERE "Course"."id" = "CoursePics"."courseId")'), 'name']
        // ])
      },
      {
        model:models.CourseType,
        as: "types",
        attributes: ['id']
      },
      {
        model:models.CourseSite,
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
      teacherId: req.body.teacherId,
      categoryId: req.body.categoryId,
    }, {transaction: t}).then(function(course) {
      var sites = req.body.sites;
      if(sites != null) {
        sites.forEach(function(site) {
          models.CourseSite.create({
            id: site.id,
            couseId: course.id
          }, {transaction: t});
        });
      }
      var types = req.body.types;
      if(types != null) {
        sites.forEach(function(type) {
          models.CourseType.create({
            id: type.id,
            courseId: course.id
          }, {transaction: t});
        });
      }
    });
  }).then(function(result) {
    res.status(201).json({status:'succ'});
  }).catch(function(err) {
    console.log(err);
  });

  // models.Course.create({
  //   title: req.body.title,
  //   price: req.body.price,
  //   //type: req.body.type,
  //   //site: req.body.site,
  //   describe: req.body.describe,
  //   teacherId: req.body.teacherId,
  //   categoryId: req.body.categoryId,
  // }).then(function(course){
  //   var sites = req.body.sites;
  //   if(sites != null) {
  //     sites.forEach(function(site) {
  //     models.CourseSite.create({
  //       id: site.id
  //     }).then(function(courseSite) {
  //       course.addSite(courseSite);
  //     });
  //   });
  //   }
  //   var types = req.body.types;
  //   if(types != null) {
  //     sites.forEach(function(type) {
  //     models.CourseType.create({
  //       id: type.id
  //     }).then(function(courseType) {
  //       course.addType(courseType);
  //     });
  //   });
  //   }
  // }).then(function() {
  //     res.status(201).json({status:'succ'});
  // });
});

router.get('/:courseId', function(req, res) {
  var courseId = req.params.courseId;
  models.Course.find({
    where:{
      id:courseId
    },
    attributes: [
      'id', 'title', 'price', 'status', 'rating', 'ratingAmount','describe', 'teacherId', 'categoryId',
    ],
    include: [
      {
        model:models.User,
        as: "teacher",
        attributes: ['id', 'nickname', 'gender', 'age', 'portrait', 'motto']
      },
      {
        model:models.Category,
        as: "category",
        attributes: ['id', 'name']
      },
      {
        model:models.District,
        as: "districts",
        attributes: ['id', 'name', 'fullName']
      },
      {
        model:models.CoursePic,
        as: "pics",
        attributes: ['name'],
      },
      {
        model:models.CourseType,
        as: "types",
        attributes: ['id']
      },
      {
        model:models.CourseSite,
        as: "sites",
        attributes: ['id']
      }
    ]
  }).then(function(courses) {
    res.json(courses);
  });
});

router.get('/:courseId/courseRatings', function(req, res) {
  var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  var orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
  var courseId = req.params.courseId;
  if(courseId == null) {
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
      include: [
        {
          model: models.User,
          as:"commentator",
          attributes: ['id', 'nickname', 'portrait']
        }
      ]
    }).then(function(courseRatings) {
      res.json(courseRatings)
    });
}).post('/courseId/courseRatings', function(req, res) {
  models.sequelize.transaction(function(t) {

  });
});

router.get('/:courseId/appointments', function(req, res) {
  var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  var orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
  var courseId = req.params.courseId;
  if(courseId == null) {
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
      include: [
        {
          model: models.User,
          as:"applicant",
          attributes: ['id', 'nickname', 'portrait', 'gender', 'age']
        }
      ]
    }).then(function(courseAppointments) {
      res.json(courseAppointments);
    });
});

module.exports = router;
