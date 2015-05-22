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

frisby.create('Create activity')
	.post(config.HOST_URL + '/activities', {
		title: "Test Create Activity",
		location: "一二三路321号",
		lat: 32,
		lng: 121,
		category: {
			id: 1
		},
		district: {
			id: 2
		},
		pics: [{
			name: "testPic.jpg"
		}, {
			name: "testPic2.jpg"
		}],
		startTime: "2014-05-22 19:00",
		endTime: "2014-05-22 21:00"
	}, {
		json: true
	})
	.expectStatus(201)
	.expectJSONTypes({
		status: String,
		activityId: Number
	})
	.expectJSON({
		status: "Success"
	})
	.toss()