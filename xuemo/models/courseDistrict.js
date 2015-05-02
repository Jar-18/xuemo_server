"use strict";

module.exports = function(sequelize, DataTypes) {
	var CourseDistrict = sequelize.define("CourseDistrict", {
		//No more attributes
		courseId: {
			type: DataTypes.INTEGER
		},
		districtId: {
			type: DataTypes.INTEGER
		}
	}, {
		timestamps: false,
	});

	return CourseDistrict;
};