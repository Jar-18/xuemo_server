var models = require('../models');
var express = require('express');
var router = express.Router();

var userService = require('../service/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	models.User.findAll().then(function(users) {
		res.json(users);
	});
});

router.get('/:userId', function(req, res) {
	var userId = req.params.userId;
	userService.findUserById(userId)
		.then(function(user) {
			res.json(user);
		});
	})
	.get('/:userId/courses', function(req, res) {
		var pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
		var pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
		var orderBy = req.query.orderBy = null ? 'createdAt DESC' : req.query.orderBy;
		var simple = req.query.simple == null ? false : (req.query.simple == 'true' ? true : false);
		var exceptCourseId = req.query.exceptCourseId;
		var teacherId = req.params.userId;

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
			}, {
				model: models.CourseType,
				as: "types",
				attributes: ['id']
			}, {
				model: models.CourseSite,
				as: "sites",
				attributes: ['id']
			}],
		}).then(function(courses) {
			res.json(courses);
		});
	});

module.exports = router;