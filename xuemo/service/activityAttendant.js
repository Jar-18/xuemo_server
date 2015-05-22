var models = require('../models');

exports.createActivityAttendant = function(activityId, attendantId) {
	return models.sequelize.transaction(function(t) {
		return models.ActivityAttendant.create({
			activityId: activityId,
			attendantId: attendantId
		}, {
			transaction: t
		}).then(function(result) {
			return models.Activity.find(activityId, {
				transaction: t
			});
		}).then(function(activity) {
			return activity.updateAttributes({
				attendantCount: 1 + activity.attendantCount
			}, {
				transaction: t
			});
		});
	});
}