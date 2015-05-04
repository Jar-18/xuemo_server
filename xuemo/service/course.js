var models = require('../models');
var districtService = require('./district');
var categoryService = require('./category');

exports.findCourseList = function(params) {

	var promiseArr = [];
	var otherFilters = {};

	if (params.districtId != null) {
		promiseArr.push(districtService.findChildDistricts(params.districtId)
			.then(function(districts) {
				var districtArr = [];
				for (var i = 0; i < districts.length; i++) {
					districtArr.push(districts[i].id);
				}
				otherFilters.districtArr = districtArr;
			}));
	}
	if (params.categoryId != null) {
		promiseArr.push(categoryService.findChildCategories(params.categoryId)
			.then(function(categories) {
				var categoryArr = [];
				for (var i = 0; i < categories.length; i++) {
					categoryArr.push(categories[i].id);
				}
				otherFilters.categoryArr = categoryArr;
			}));
	}


	return models.sequelize.Promise.all(promiseArr)
		.then(function() {
			return _findCourseIdList(params, otherFilters);
		})
		.then(function(courses) {
			var courseIdArr = [];
			for(var i = 0;i < courses.length;i++) {
				courseIdArr.push(courses[i].id);
			}
			return _findCourseList(params, courseIdArr);
		});

}

function _findCourseIdList(params, otherFilters) {
	var whereArr = [" 1 = 1 "];
	if(params.exceptCourseId != null) {
		whereArr[0] += (" and id <> ? ");
		whereArr.push(params.exceptCourseId);
	}
	if(params.teacherId != null) {
		whereArr[0] += (" and teacherId = ? ");
		whereArr.push(params.teacherId);
	}
	if(otherFilters.districtArr != null) {
		whereArr[0] += " and exists(select * from courseDistricts as cd where Course.id = cd.courseId and cd.districtId in (?)) ";
		whereArr.push(otherFilters.districtArr);
	}
	if(otherFilters.categoryArr != null) {
		whereArr[0] += " and categoryId in (?) ";
		whereArr.push(otherFilters.categoryArr);
	}
	return models.Course.findAll({
		where: whereArr,
		attributes: ['id'],
		offset: (params.pageNumber - 1) * params.pageSize,
		limit: params.pageSize,
		order: params.orderBy,
	});
}

function _findCourseList(params, courseIdArr) {
	return models.Course.findAll({
		where: {
			id: {
				$in: courseIdArr
			}
		},
		attributes: ['id', 'title', 'price', 'status', 'rating', 'ratingCount', 'teacherId', 'categoryId', 'createdAt'],
		order: params.orderBy,
		include: [{
			model: models.User,
			as: "teacher",
			attributes: ['id', 'nickname', 'gender', 'age']
		}, {
			model: models.Category,
			as: "category",
			attributes: ['id', 'name'],
		}, {
			model: models.District,
			as: "districts",
			attributes: ['id', 'name', 'fullName'],
		}, {
			model: models.CoursePic,
			as: "pics",
			attributes: ['name']
		}],
	});
}