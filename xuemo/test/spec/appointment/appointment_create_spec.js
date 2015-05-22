var frisby = require('frisby');
var config = require('../../config/config.json');

frisby.globalSetup({ // globalSetup is for ALL requests
	request: {
		headers: {
			'Content-Type': 'application/json'
		}
	}
});

frisby.create('Create appointment')
	.post(config.HOST_URL + '/appointments', {
		courseId: 2,
		applicantId: 2
	}, {
		json: true
	})
	.expectStatus(201)
	.expectJSONTypes({
		status: String,
		appointmentId: Number
	})
	.expectJSON({
		status: 'Success'
	})
	.toss()