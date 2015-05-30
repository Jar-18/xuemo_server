var models = require('../models');

var userService = require('./user');

var rc = require('then-redis').createClient();

exports.getAttentionList = function(userId, params) {
	console.log(userId);
	console.log(params);
	return rc.zrevrange('attention:' + userId, (params.pageNumber - 1) * params.pageSize, params.pageNumber * params.pageSize)
		.then(function(userIdArr) {
			console.log(userIdArr);
			if(userIdArr.length > 0) {
				return userService.findUserListByIdArr({
					orderBy: "nickname"
				}, userIdArr);
			} else {
				return [];
			}
		});
}

exports.getFollowerList = function(userId, params) {
	return rc.zrevrange('follower:' + userId, (params.pageNumber - 1) * params.pageSize, params.pageNumber * params.pageSize)
		.then(function(userIdArr) {
			console.log(userIdArr);
			if(userIdArr.length > 0) {
				return userService.findUserListByIdArr({
					orderBy: "nickname"
				}, userIdArr);
			} else {
				return [];
			}
		});
}

exports.createFollower = function(followerId, attentionId) {
	//TODO 处理一致性
	rc.zadd('follower:' + attentionId, Date.now(), followerId)
		.then(function(response) {
			//if (err) throw err;
			console.log('Redis - added ' + response + ' items.');
		});
	rc.zadd('attention:' + followerId, Date.now(), attentionId)
		.then(function(response) {
			//if (err) throw err;
			console.log('Redis - added ' + response + ' items.');
		});

	return models.Follower.create({
		followerId: followerId,
		attentionId: attentionId
	});
}

exports.removeFollower = function(followerId, attentionId) {
	rc.zrem('follower:' + attentionId, followerId)
		.then(function(response) {
			//if (err) throw err;
			console.log('Redis - removed ' + response + ' items.');
		});
	rc.zrem('attention:' + followerId, attentionId)
		.then(function(response) {
			//if (err) throw err;
			console.log('Redis - removed ' + response + ' items.');
		});
	return models.Follower.findOne({
		where: {
			followerId: followerId,
			attentionId: attentionId
		}
	}).then(function(follower) {
		return follower.destroy();
	});
}