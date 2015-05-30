var frisby = require('frisby');
var config = require('../../config/config.json');

frisby.globalSetup({ // globalSetup is for ALL requests
	request: {
		headers: {
			'Content-Type': 'application/json'
		}
	}
});

frisby.create('Create course favourite')
	.post(config.HOST_URL + '/favourites', {
		userId: 1,
		courseId: 2
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