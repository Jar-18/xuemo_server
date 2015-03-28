var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
  var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
  var simple = req.query.simple == null ? false : (req.query.simple == 'true' ? true : false);
  models.Course.findAll({
    attributes: simple == true? ['id', 'title', 'price', 'status', 'rating','teacherId', 'categoryId']
      : ['id', 'title', 'price', 'status', 'rating', 'type', 'site', 'describle', 'teacherId', 'categoryId'],
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
  	include: [
  		{
  			model:models.User,
  			as: "teacher",
        attributes: ['id', 'nickName', 'gender', 'age']
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
});

router.get('/:courseId', function(req, res) {
  var courseId = req.params.courseId;
  models.Course.find({
    where:{
      id:courseId
    },
    attributes: ['id', 'title', 'price', 'status', 'rating', 'ratingAmount','type', 'site', 'describle', 'teacherId', 'categoryId'],
    include: [
      {
        model:models.User,
        as: "teacher",
        attributes: ['id', 'nickName', 'gender', 'age']
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
      }
    ]
  }).then(function(courses) {
    res.json(courses);
  });
})

module.exports = router;
