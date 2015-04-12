var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  	console.log('post');

  	console.log(req.files);
  	
	res.status('200').send(req.files.file.name);

}).get('/', function(req, res) {
	console.log('get');
  	res.send('2');
});

module.exports = router;
