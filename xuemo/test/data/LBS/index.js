var models = require("../../../models");

var geohash = require("ngeohash");

var centerLat = 31.202766;
var centerLon = 121.607423;

var range = 0.1;

var amount = 1000;

exports.createInitData = function() {
	for(var i = 0;i < amount;i++) {
		var destLat = (centerLat + (2 * Math.random() - 1) * range).toFixed(6);
		var destLon = (centerLon + (2 * Math.random() - 1) * range).toFixed(6);
		var geohashCode = geohash.encode(destLat, destLon);
		models.Activity.create({
			title: destLat + ',' + destLon,
			categoryId: "3",
			hostId: "1",
			describe: "test LBS",
			lat: destLat,
			lon: destLon,
			location: destLat + ',' + destLon,
			geohash: geohashCode,
			startTime: "2015-05-06 00:00:00",
			attendantCount: "18"
		});
	}
}