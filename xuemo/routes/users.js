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
		res.json(user);
	});
})

module.exports = router;