var models = require('../models');

var geohash = require('ngeohash');

exports.findActivityList = function(params) {

	if ("distance" == params.orderBy) {
		var geohashCode = geohash.encode(params.lat, params.lon);

		return _findSmallestArea(geohashCode, params.pageSize)
			.then(function(activities) {
				for(var i = 0;i < activities.length;i++) {
					var activity = activities[i];
					activity.dataValues.distance = _calcCrow(activity.lat, activity.lon, params.lat, params.lon);
				}
				activities.sort(function(a, b) {
					return a.dataValues.distance - b.dataValues.distance;
				});
				return activities.slice(0, params.pageSize);
			});

	} else {
		//TODO paging and sort
		return models.Activity.findAll({
			limit: params.pageSize,
			offset: (params.pageNumber - 1) * params.pageSize,
			order: params.orderBy,
			attributes: ['id', 'title', 'location', 'startTime', 'attendantCount', 'categoryId', 'districtId', 'updatedAt'],
			include: [{
				model: models.Category,
				as: "category",
				attributes: ['id', 'name']
			}, {
				model: models.District,
				as: "district",
				attributes: ['id', 'name', 'fullName']
			}, {
				model: models.ActivityPic,
				as: "pics",
				attributes: ['name']
			}]
		});
	}
}

function _findSmallestArea(geohashCode, lowest) {
	return models.Activity.findAndCountAll({
		where: {
			geohash: {
				$like: geohashCode + '%'
			}
		}
	}).then(function(result) {
		if (result.count >= lowest) {
			return result.rows;
		} else {
			//判断string空
			return _findSmallestArea(geohashCode.substring(0, geohashCode.length - 1), lowest);
		}
	});
}

function _calcCrow(lat1, lon1, lat2, lon2) {
	var R = 6371; // km
	var dLat = _toRad(lat2 - lat1);
	var dLon = _toRad(lon2 - lon1);
	var lat1 = _toRad(lat1);
	var lat2 = _toRad(lat2);

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d;
}

// Converts numeric degrees to radians
function _toRad(Value) {
	return Value * Math.PI / 180;
}