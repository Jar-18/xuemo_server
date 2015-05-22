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

frisby.create('Select activity list')
	.get(config.HOST_URL + '/activities')
	.expectStatus(200)
	.expectJSONTypes('0', {
		id: Number,
		title: String,
		location: String,
		startTime: String,
		attendantCount: Number,
		category: {
			id: Number,
			name: String
		},
		district: {
			id: Number,
			name: String,
			fullName: String
		},
		pics: Array
	})
	.toss()