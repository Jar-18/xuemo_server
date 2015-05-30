var models = require('../models');
var express = require('express');
var router = express.Router();

var followerService = require('../service/follower');

router.get('/', function(req, res, next) {
		var followerId = req.query.followerId;
		var attentionId = req.query.attentionId;

		var params = {
			pageSize: req.query.pageSize ? req.query.pageSize : 10,
			pageNumber: req.query.pageNumber ? req.query.pageNumber : 1
		};

		if (followerId && !attentionId) {
			followerService.getAttentionList(followerId, params)
				.then(function(users) {
					res.status(200)
						.json(users);
				});
		} else if (attentionId && !followerId) {
			followerService.getFollowerList(attentionId,params)
				.then(function(users) {
					res.status(200)
						.json(users);
				});
		} else {
			res.send("Parameter error");
		}
	})
	.post('/', function(req, res, next) {
		var followerId = req.body.followerId;
		var attentionId = req.body.attentionId;
		followerService.createFollower(followerId, attentionId)
			.then(function(result) {
				res.status(201)
					.json({
						status: "Success"
					});
			});
	})
	.delete('/', function(req, res, next) {
		var followerId = req.query.followerId;
		var attentionId = req.query.attentionId;
		followerService.removeFollower(followerId, attentionId)
			.then(function(result) {
				res.status(201)
					.json({
						status: "Success"
					});
			});
	});

module.exports = router;