var models = require('../models');
var express = require('express');
var router = express.Router();

var activityService = require('../service/activity');

router.get('/', function(req, res, next) {
		var params = {};
		params.pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
		params.pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
		params.orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;

		params.hostId = req.query.hostId;
		//Temp
		if ("distance" == req.query.orderBy) {
			params.orderBy = 'distance';
			params.lng = req.query.lng;
			params.lat = req.query.lat;
		} else if ("latest" == req.query.orderBy) {
			params.orderBy = 'updatedAt DESC';
		} else {
			params.orderBy = 'updatedAt DESC';
		}

		activityService.findActivityList(params)
			.then(function(activitiesWithCount) {
				res.set({
					'Access-Control-Expose-Headers': 'X-Total-Count',
					'X-Total-Count': activitiesWithCount.count
				});
				res.status(200)
					.json(activitiesWithCount.rows);
			});
	})
	.post("/", function(req, res, next) {
		var params = {};
		params.title = req.body.title;
		params.category = req.body.category;
		params.hostId = req.body.hostId;
		params.describe = req.body.describe;
		params.district = req.body.district;
		params.location = req.body.locatoin;
		params.lat = req.body.lat;
		params.lng = req.body.lng;
		params.startTime = req.body.startTime;
		params.endTime = req.body.endTime;
		params.pics = req.body.pics;
		activityService.createActivity(params)
			.then(function(activityId) {
				//console.log(this.activityId);
				res.status(201)
					.json({
						status: "Success",
						activityId: activityId
					});
			});
	});

router.get('/:activityId', function(req, res, next) {
	activityService.findActivityById(req.params.activityId)
		.then(function(activity) {
			res.status(200)
				.json(activity);
		});
});

module.exports = router;