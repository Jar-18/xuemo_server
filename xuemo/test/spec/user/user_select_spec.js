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

frisby.create('Select one user')
	.get(config.HOST_URL + '/users/1')
	.expectStatus(200)
	.expectJSONTypes({
		id: Number,
		nickname: String,
		gender: Number,
		age: Number,
		portrait: String,
		motto: String,
		birthday: String,
		constellation: Number,
		district: {
			id: Number,
			name: String,
			fullName: String
		},
		interests: Array,
		attentionCount: Number,
		followerCount: Number
	})
	.expectJSON({
		attentionCount: 1,
		followerCount: 2
	})
	.toss()