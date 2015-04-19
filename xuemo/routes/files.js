var models = require('../models');
var express = require('express');
var qiniu = require('qiniu');
var router = express.Router();

function uptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  //putPolicy.callbackUrl = callbackUrl;
  //putPolicy.callbackBody = callbackBody;
  //putPolicy.returnUrl = returnUrl;
  //putPolicy.returnBody = returnBody;
  //putPolicy.asyncOps = asyncOps;
  //putPolicy.expires = expires;

  return putPolicy.token();
}

router.get('/uploadToken', function(req, res, next) {
  //res.send('respond with a resource');
  res.send(uptoken('xuemo'));
});

module.exports = router;