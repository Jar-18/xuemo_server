var models = require('../models');

exports.findActivityList = function(params) {
	return models.Activity.findAll({
		limit: params.pageSize,
		offset: (params.pageNumber - 1) * params.pageSize,
		order: params.orderBy,
		attributes: ['id', 'title', 'location', 'startTime', 'attendantCount', 'categoryId', 'districtId'],
		include: [{
			model: models.Category,
			as: "category",
			attributes: ['id', 'name']
		}, {
			model: models.District,
			as: "district",
			attributes: ['id', 'name', 'fullName']
		}, {
			model: models.ActivityPic,
			as: "pics",
			attributes: ['name']
		}]
	});
}