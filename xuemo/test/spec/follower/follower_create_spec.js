var frisby = require('frisby');
var config = require('../../config/config.json');

frisby.globalSetup({ // globalSetup is for ALL requests
	request: {
		headers: {
			'Content-Type': 'application/json'
		}
	}
});

frisby.create('Create follower relationship')
	.post(config.HOST_URL + '/followers', {
		followerId: 2,
		attentionId: 1
	}, {
		json: true
	})
	.expectStatus(201)
	.expectJSONTypes({
		status: String,
	})
	.expectJSON({
		status: 'Success'
	})
	.toss()