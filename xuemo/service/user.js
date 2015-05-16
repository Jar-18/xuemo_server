var models = require('../models');

var geohash = require('ngeohash');

var locUtil = require('../util/locUtil');

exports.findUserById = function(userId) {
	return models.sequelize.Promise
		.all([_findUserById(userId),
			_findAttentionCount(userId),
			_findFollowerCount(userId)
		])
		.then(function(result) {
			result[0].dataValues.attentionCount = result[1];
			result[0].dataValues.followerCount = result[2];
			return result[0];
		});
}

exports.findNearbyUsers = function(params) {
	if ("distance" == params.orderBy) {
		var geohashCode = geohash.encode(params.lat, params.lng);

		return _findSmallestArea(geohashCode, params.pageSize, params.userId)
			.then(function(users) {
					//console.log(users);

				var userArr = [];
				for (var i = 0; i < users.length; i++) {
					var user = users[i].dataValues;
					user.user.dataValues.distance = locUtil.calcCrow(user.lat, user.lng, params.lat, params.lng).toFixed(1);
					userArr.push(user.user);
					//console.log(user.user);
				}
				userArr.sort(function(a, b) {
					return a.dataValues.distance - b.dataValues.distance;
				});
				return userArr.slice((params.pageNumber - 1) * params.pageSize, params.pageNumber * params.pageSize);
			});

	} else {
		//TODO paging and sort
		return models.User.findAll({
			limit: params.pageSize,
			offset: (params.pageNumber - 1) * params.pageSize,
			orderBy: params.orderBy
		});
	}
}

function _findSmallestArea(geohashCode, lowest, userId) {
	return models.UserLocation.findAndCountAll({
		where: {
			geohash: {
				$like: geohashCode + '%'
			},
			userId: {
				$ne: userId
			}
		},
		include: [{
			model: models.User,
			as: "user"
		}]
	}).then(function(result) {
		if (result.count >= lowest || geohashCode == "") {
			return result.rows;
		} else {
			//判断string空
			return _findSmallestArea(geohashCode.substring(0, geohashCode.length - 1), lowest, userId);
		}
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