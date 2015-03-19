var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  models.Course.findAll({
  	include: [models.Category, models.District]
  }).then(function(courses) {
  	res.json(courses);
  });
});

router.get('/:courseId', function(req, res) {
	//res.send(req.params.userId);
})

module.exports = router;
