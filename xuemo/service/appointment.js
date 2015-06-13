var models = require('../models');

exports.findAllByUserId = function(userId, params) {
	return models.Appointment.findAll({
		where: {
			applicantId: userId
		},
		limit: params.pageSize,
		offset: (params.pageNumber - 1) * params.pageSize,
		order: params.orderBy,
		attribues: ['courseId', 'status', 'userId', 'updatedAt'],
		include: [{
			model: models.Course,
			as: 'appliedCourse',
			include: [{
				model: models.CourseSite,
				as: 'sites'
			},{
				model: models.CourseType,
				as: 'types'
			},{
				model: models.CoursePic,
				as: 'pics'
			},{
				model: models.District,
				as: 'districts'
			},{
				model: models.Category,
				as: 'category'
			}]
		}]
	});
}

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

exports.createAppointment = function(courseId, applicantId) {
	return models.Appointment.create({
		courseId: courseId,
		applicantId: applicantId
	});
}