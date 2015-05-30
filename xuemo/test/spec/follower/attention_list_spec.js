var frisby = require('frisby');
var config = require('../../config/config.json');

frisby.globalSetup({ // globalSetup is for ALL requests
	request: {
		headers: {
			'Content-Type': 'application/json'
		}
	}
});

frisby.create('Get attention list')
	.get(config.HOST_URL + '/followers', {
		followerId: 1
	}, {
		json: true
	})
	.expectStatus(200)
	.toss()