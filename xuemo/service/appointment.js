var models = require('../models');

exports.findAllByCourseId = function(courseId, params) {
	return models.Appointment.findAll({
		where: {
			courseId: courseId
		},
		limit: params.pageSize,
		offset: (params.pageNumber - 1) * params.pageSize,
		order: params.orderBy,
		attributes: ['updatedAt'],
		include: [{
			model: models.User,
			as: "applicant",
			attributes: ['id', 'nickname', 'portrait', 'gender', 'age']
		}]
	});
}