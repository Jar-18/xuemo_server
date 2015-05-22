var models = require("../../../models");

var geohash = require("ngeohash");

var centerLat = 31.202766;
var centerLon = 121.607423;

var range = 0.1;

var activityAmount = 10;

var userAmount = 100;

exports.createInitData = function() {
	for (var i = 0; i < activityAmount; i++) {
		var destLat = (centerLat + (2 * Math.random() - 1) * range).toFixed(6);
		var destLon = (centerLon + (2 * Math.random() - 1) * range).toFixed(6);
		var geohashCode = geohash.encode(destLat, destLon);
		models.Activity.create({
			title: destLat + ',' + destLon,
			categoryId: 3,
			districtId: 1,
			hostId: 1,
			describe: "test LBS",
			lat: destLat,
			lng: destLon,
			location: destLat + ',' + destLon,
			geohash: geohashCode,
			startTime: "2015-05-06 00:00:00",
			endTime: "2015-05-06 08:00:00",
			attendantCount: 18
		});
	}

	var destLat = centerLat + 0.001;
	var destLng = centerLon + 0.001;
	var geohashCode = geohash.encode(destLat, destLon);
	models.UserLocation.create({
		userId: 2,
		geohash: geohashCode,
		lat: destLat,
		lng: destLng
	});

	var destLat = centerLat - 0.01;
	var destLng = centerLon - 0.01;
	var geohashCode = geohash.encode(destLat, destLon);
	models.UserLocation.create({
		userId: 3,
		geohash: geohashCode,
		lat: destLat,
		lng: destLng
	});


	for (var i = 0; i < userAmount; i++) {
		models.User.create({
			nickname: "LBS Test User",
			gender: 0,
			motto: "Test LBS"
		}).then(function(user) {
			var destLat = (centerLat + (2 * Math.random() - 1) * range).toFixed(6);
			var destLng = (centerLon + (2 * Math.random() - 1) * range).toFixed(6);
			var geohashCode = geohash.encode(destLat, destLon);
			models.UserLocation.create({
				userId: user.id,
				geohash: geohashCode,
				lat: destLat,
				lng: destLng
			});
		});
	}
}