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
				var token = jwt.sign(user, config['secrect'], {
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
		jwt.verify(token, config['secrect'], function(err, decoded) {
			if (err) {
				return res.json({
					status: "Fail",
					message: 'Failed to authenticate token.'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});

	} else {
		return res.status(403)
			.json({
				status: "Fail",
				message: 'No token provided.'
			});
	}
}