var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  models.Course.findAll({
  	include: [
  		{
  			model:models.User,
  			as: "teacher"
  		},
  		{
  			model:models.Category,
  			as: "category"
  		},
  		{
  			model:models.District,
  			as: "districts"
  		}
  	]
  }).then(function(courses) {
  	res.json(courses);
  });
});

router.get('/:courseId', function(req, res) {
	models.Course.findAll({
  	include: [
  		{
  			model:models.User,
  			as: "teacher"
  		},
  		{
  			model:models.Category,
  			as: "category"
  		},
  		{
  			model:models.District,
  			as: "districts"
  		}
  	]
  	}).then(function(course) {
  		res.json(course);
  	});
})

module.exports = router;
