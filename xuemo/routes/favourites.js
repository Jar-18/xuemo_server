var models = require('../models');
var express = require('express');
var router = express.Router();

var favouriteService = require('../service/favourite');

router.post('/', function(req, res) {
	var params = {
		userId: req.body.userId,
		courseId: req.body.courseId
	};
	favouriteService.createFavourite(params)
		.then(function(result) {
			res.status(201)
				.json({
					status: "Success"
				});
		});
});

module.exports = router;