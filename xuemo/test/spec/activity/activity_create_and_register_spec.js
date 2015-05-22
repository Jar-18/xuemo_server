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
		hostId: 1,
		pics: [{
			name: "testPic.jpg"
		}, {
			name: "testPic2.jpg"
		}],
		startTime: "2014-05-22 19:00",
		endTime: "2014-05-22 21:00",
		describe: "created by test"
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
	.afterJSON(function(result) {
		//Put register test here
		//Avoid repeat runing test cause unique constraint error
		frisby.create('Register activity')
			.post(config.HOST_URL + '/activityAttendants', {
				activityId: result.activityId,
				attendantId: 2
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
	})
	.toss()