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

frisby.create('Select course list')
	.get(config.HOST_URL + '/courses')
	.expectStatus(200)
	.expectJSONTypes('0', {
		id: Number,
		title: String,
		price: Number,
		status: Number,
		rating: Number,
		ratingCount: Number,
		teacher: {
			id: Number,
			nickname: String,
			gender: Number,
			age: Number,
		},
		category: {
			id: Number,
			name: String
		},
		districts: function(val) {
			return util.notEmptyArray(val);
		},
		pics: Array
	})
	.toss()