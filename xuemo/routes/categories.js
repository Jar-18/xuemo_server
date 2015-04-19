var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	models.Category.findAll()
		.then(function(categories) {
			res.json(categories)
		});
});

module.exports = router;