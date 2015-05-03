var frisby = require('frisby');
var config = require('../../config/config.json');
var util = require('../../util/util.js');

frisby.globalSetup({ // globalSetup is for ALL requests
	request: {
		headers: {
			'Content-Type': 'application/json'
		}
	}
});

frisby.create('Select course appointment log list for one course')
	.get(config.HOST_URL + '/courses/1/appointments')
	.expectStatus(200)
	.expectJSONTypes('0', {
		updatedAt: String,
		applicant: {
			id: Number,
			nickname: String,
			portrait: String,
			gender: Number,
			age: Number
		}
	})
	.toss()