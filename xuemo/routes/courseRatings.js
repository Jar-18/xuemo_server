var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var courseId = req.query.courseId;
	if(courseId == null) {
		res.send("Not support");
		return;
	}
  	models.CourseRating.findAll({
  		where: {
  			CourseId: courseId
  		},
  		attributes: ['rating', 'comment', 'updatedAt'],
  		include: [
  			{
  				model: models.User,
  				as:"commentator",
  				attributes: ['id', 'nickname']
  			}
  		]
  	}).then(function(courseRatings) {
  		res.json(courseRatings);
  	});
});

router.get('/:courseRatingId', function(req, res) {
	res.send("Not support");
})

module.exports = router;
