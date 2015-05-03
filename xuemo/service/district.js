var models = require('../models');

exports.findChildDistricts = function(districtId) {
	return models.District.find({
		where: {
			id: districtId
		}
	}).then(function(district) {
		return models.District.findAll({
			where: {
				code: {
					$like: district.code + '%'
				}
			}
		});
	})
}