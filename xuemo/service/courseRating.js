var models = require('../models');

exports.findAllByCourseId = function(courseId, params) {
	return models.CourseRating.findAll({
		where: {
			courseId: courseId
		},
		limit: params.pageSize,
		offset: (params.pageNumber - 1) * params.pageSize,
		order: params.orderBy,
		attributes: ['rating', 'comment', 'updatedAt'],
		include: [{
			model: models.User,
			as: "commentator",
			attributes: ['id', 'nickname', 'portrait']
		}]
	});
}