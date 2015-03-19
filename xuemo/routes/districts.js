var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  models.District.findAll().then(function(users) {
  	res.json(users);
  });
});

module.exports = router;
