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

frisby.create('Filter course by category')
	.get(config.HOST_URL + '/courses?categoryId=5')
	.expectStatus(200)
	.expectJSON([{
		id: 3
	}])
	.toss();

frisby.create('Filter course by district(including its child districs)')
	.get(config.HOST_URL + '/courses?districtId=2')
	.expectStatus(200)
	.expectJSON([{
		id: 1
	},{
		id: 3
	}])
	.toss();