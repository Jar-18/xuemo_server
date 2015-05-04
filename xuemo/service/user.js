var models = require('../models');

exports.findUserById = function(userId) {
	return models.sequelize.Promise
		.all([_findUserById(userId), 
			_findAttentionCount(userId),
			_findFollowerCount(userId)])
		.then(function(result) {
			result[0].dataValues.attentionCount = result[1];
			result[0].dataValues.followerCount = result[2];
			return result[0];
		});
}

function _findUserById(userId) {
	return models.User.find({
		where: {
			id: userId
		},
		include: [{
			model: models.Interest,
			as: "interests",
			attributes: ['id']
		}, {
			model: models.District,
			as: "district",
			attributes: ['id', 'name', 'fullName']
		}]
	});
}

function _findAttentionCount(userId) {
	return models.Follower.count({
		where: {
			followerId: userId
		}
	});
}

function _findFollowerCount(userId) {
	return models.Follower.count({
		where: {
			attentionId: userId
		}
	});
}

function _countFollower() {}