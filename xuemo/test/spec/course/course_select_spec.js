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

frisby.create('Select one course')
	.get(config.HOST_URL + '/courses/1')
	.expectStatus(200)
	.expectJSONTypes({
		id: Number,
		title: String,
		price: Number,
		status: Number,
		rating: Number,
		ratingCount: Number,
		describe: String,
		teacher: {
			id: Number,
			nickname: String,
			gender: Number,
			age: Number,
			portrait: String,
			motto: String
		},
		category: {
			id: Number,
			name: String
		},
		districts: function(val) {
			return util.notEmptyArray(val);
		},
		pics: function(val) {
			return util.notEmptyArray(val);
		},
		types: function(val) {
			return util.notEmptyArray(val);
		},
		sites: function(val) {
			return util.notEmptyArray(val);
		}
	})
	.toss()