var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var user = {
  	id:1,
  	name: 'Jar'
  };
  res.json(user);
});

router.get('/:userId', function(req, res) {
	res.send(req.params.userId);
})

module.exports = router;
