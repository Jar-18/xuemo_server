var models = require('../models');
var express = require('express');
var router = express.Router();

var activityService = require('../service/activity');

router.get('/', function(req, res, next) {
	var params = {};
	params.pageSize = req.query.pageSize == null ? 10 : req.query.pageSize;
	params.pageNumber = req.query.pageNumber == null ? 1 : req.query.pageNumber;
	params.orderBy = req.query.orderBy = null ? 'updatedAt DESC' : req.query.orderBy;
	
	//Temp
	if("distance" == req.query.orderBy) {
		params.orderBy = 'distance';
		params.lng = req.query.lng;
		params.lat = req.query.lat;
	}
	else if(null == req.query.orderBy) {
		params.orderBy = 'updatedAt DESC';
	}
	else {
		params.orderBy = req.query.orderBy;
	}

	activityService.findActivityList(params)
		.then(function(activities) {
			res.status(200)
				.json(activities);
		});
});

module.exports = router;