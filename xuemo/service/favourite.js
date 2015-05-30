var models = require('../models');

var rc = require('redis').createClient();

exports.createFavourite = function(params) {
	//TODO 处理同步
	rc.zadd(['favourite:' + params.userId, Date.now(), params.courseId], function (err, response) {
		if (err) throw err;
		console.log('Redis - added '+response+' items.');
	});
	return models.Favourite.create({
		userId: params.userId,
		courseId: params.courseId
	});
}