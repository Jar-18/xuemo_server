var models = require('../models');

var rc = require('then-redis').createClient();

exports.createFavourite = function(params) {
	//TODO 处理一致性
	rc.zadd('favourite:' + params.userId, Date.now(), params.courseId)
		.then(function(response) {
			//if (err) throw err;
			console.log('Redis - added ' + response + ' items.');
		});
	return models.Favourite.create({
		userId: params.userId,
		courseId: params.courseId
	});
}