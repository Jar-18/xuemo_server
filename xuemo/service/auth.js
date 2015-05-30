var models = require('../models');
var jwt = require('jsonwebtoken');
var md5 = require('MD5');

var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];

exports.signAuth = function(req, res, next) {
	var account = req.body.account;
	var passwordHash = md5(req.body.password);
	models.User.findOne({
		where: {
			account: account,
		}
	}).then(function(user) {
		if (!user) {
			res.json({
				status: 'Fail',
				message: 'User not exists'
			});
		} else {
			if (user.passwordHash != passwordHash) {
				res.json({
					status: 'Fail',
					message: 'Password not matches'
				});
			} else {
				delete user.dataValues.passwordHash;
				var userToHash = {
					userId: user.id
				}
				var token = jwt.sign(userToHash, config['secrect'], {
					//expires in 90 days
					expiresInMinutes: 60 * 60 * 24 * 90
				});
				res.status(200)
					.json({
						status: 'Success',
						token: token,
						user: user
					});
			}
		}
	});
}

exports.verifyAuth = function(req, res, next) {
	console.log(req.headers);
	var token = req.body.token || req.query.token || req.headers['authorization'];
	if (token) {
		try {
			var decoded = jwt.verify(token, config['secrect']);
			req.decoded = decoded;
		} catch (err) {
			console.log('Auth fail');
			res.json({
				status: "Fail",
				message: 'Failed to authenticate token.'
			});
		}
	} else {
		// return res.status(403)
		// 	.json({
		// 		status: "Fail",
		// 		message: 'No token provided.'
		// 	});
	}
}