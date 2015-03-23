var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var pageSize = req.params.pageSize == null ? 10 : req.params.pageSize;
  var pageNumber = req.params.pageNumber == null ? 1 : req.params.pageNumber;
  models.Course.findAll({
    attributes: ['id', 'title', 'price', 'status', 'rating', 
      'teacherId', 'categoryId'],
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
      }
  	]
  }).then(function(courses) {
  	res.json(courses);
  });
});

// router.get('/:courseId', function(req, res) {
// 	models.Course.findAll({
//   	include: [
//   		{
//   			model:models.User,
//   			as: "teacher"
//   		},
//   		{
//   			model:models.Category,
//   			as: "category"
//   		},
//   		{
//   			model:models.District,
//   			as: "districts"
//   		},
//       {
//         model:models.CoursePic,
//         as: "pics",
//       }
//   	]
//   	}).then(function(course) {
//   		res.json(course);
//   	});
// })

module.exports = router;
