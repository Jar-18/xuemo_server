var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	models.User.findAll().then(function(users) {
		res.json(users);
	});
});

router.get('/:userId', function(req, res) {
	models.User.find(req.params.userId).then(function(user) {
		models.User.find({
			where: {
				id: req.params.userId
			},
			include: [{
				model: models.Interest,
				as: "interests",
				attributes: ['id']
			}, 
			{
				model: models.District,
				as: "district",
				attributes: ['id', 'name', 'fullName']
			}
			]
		}).then(function(user) {
			models.Follower.count({
				where: {
					followerId: req.params.userId
				}
			}).then(function(attentionCount) {
				user.dataValues.attentionCount = attentionCount;
				models.Follower.count({
					where: {
						attentionId: req.params.userId
					}
				}).then(function(followerCount) {
					user.dataValues.followerCount = followerCount;
					res.json(user);
				});
			});
		});
	});
})

module.exports = router;