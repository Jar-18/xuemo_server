var models = require('../models');
var express = require('express');
var router = express.Router();

var activityAttendantService = require('../service/activityAttendant');

router.post('/', function(req, res) {
  if (req.body.attendantId == null || req.body.activityId == null) {
    res.json('Parameter error');
    return;
  }
  activityAttendantService.createActivityAttendant(req.body.activityId, req.body.attendantId)
    .then(function(result) {
      res.status(201)
        .json({
          status: "Success"
        });
    })
    .catch(function(err) {
      res.status(500)
        .json(err);
    });
});

module.exports = router;