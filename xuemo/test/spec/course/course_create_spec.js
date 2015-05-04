var frisby = require('frisby');
var config = require('../../config/config.json');

frisby.globalSetup({ // globalSetup is for ALL requests
	request: {
		headers: {
			'Content-Type': 'application/json'
		}
	}
});

frisby.create('Create course in step 1')
	.post(config.HOST_URL + '/courses', {
		title: "Course created by frisby",
		describe: "Desceibe...",
		price: 100,
		teacher: {
			id: 1
		},
		category: {
			id: 1
		},
		districts: [{
			id: 3
		}],
		sites: [{
			id: 1
		}, {
			id: 2
		}],
		types: [{
			id: 1
		}, {
			id: 2
		}]
	}, {
		json: true
	})
	.expectStatus(201)
	.expectJSONTypes({
		status: String,
		courseId: Number
	})
	.expectJSON({
		status: 'Success'
	})
	.afterJSON(function(result) {
		frisby.create("Create course in step 2")
			.put(config.HOST_URL + '/courses/' + result.courseId, {
				describe: "Desceibe...",
				pics: [{
					id: "default.jpg"
				}, {
					id: "default2.jpg"
				}]
			}, {
				json: true
			})
			.expectStatus(201)
			.expectJSONTypes({
				status: String
			})
			.expectJSON({
				status: 'Success'
			})
			.toss();
	})
	.toss()