var models = require('../models');

var courseService = require('./course');

var rc = require('then-redis').createClient();

exports.getCourseFavouriteList = function(userId, params) {
	return rc.zrevrange('courseFavourite:' + userId, (params.pageNumber - 1) * params.pageSize, params.pageNumber * params.pageSize)
		.then(function(courseIdArr) {
			console.log(courseIdArr);
			if (courseIdArr.length > 0) {
				return courseService.findCourseListByIdArr({
					orderBy: "createdAt DESC"
				}, courseIdArr);
			} else {
				return [];
			}
		});
}

exports.createCourseFavourite = function(params) {
	//TODO 处理一致性
	rc.zadd('courseFavourite:' + params.userId, Date.now(), params.courseId)
		.then(function(response) {
			//if (err) throw err;
			console.log('Redis - added ' + response + ' items.');
		});
	return models.CourseFavourite.create({
		userId: params.userId,
		courseId: params.courseId
	});
}

exports.removeCourseFavourite = function(params) {
	//TODO 处理一致性
	rc.zrem('courseFavourite:' + params.userId, params.courseId)
		.then(function(response) {
			//if (err) throw err;
			console.log('Redis - removed ' + response + ' items.');
		});
	return models.CourseFavourite.findOne({
		where: {
			userId: params.userId,
			courseId: params.courseId
		}
	}).then(function(favourite) {
		return favourite.destroy();
	});
}