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

frisby.create('Select course ratings list for one course')
	.get(config.HOST_URL + '/courses/1/courseRatings')
	.expectStatus(200)
	.expectJSONTypes('0', {
		rating: Number,
		comment: String,
		updatedAt: String,
		commentator: {
			id: Number,
			nickname: String,
			portrait: String
		}
	})
	.toss()