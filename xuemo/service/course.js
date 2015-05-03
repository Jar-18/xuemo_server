var models = require('../models');
var districtService = require('./district');
var categoryService = require('./category');

exports.findCourseList = function(params) {
	var wherePart = {};
	if (params.exceptCourseId != null) {
		wherePart.id = {
			$ne: params.exceptCourseId
		};
	}
	if (params.teacherId != null) {
		wherePart.teacherId = params.teacherId;
	}

	var promiseArr = [];
	var otherModelWherePart = {};

	if (params.districtId != null) {
		promiseArr.push(districtService.findChildDistricts(params.districtId)
			.then(function(districts) {
				var districtsArr = [];
				for (var i = 0; i < districts.length; i++) {
					districtsArr.push(districts[i].id);
				}
				otherModelWherePart.districtWherePart = {};
				otherModelWherePart.districtWherePart.id = {
					$in: districtsArr
				};
			}));
	}
	if (params.categoryId != null) {
		promiseArr.push(categoryService.findChildCategories(params.categoryId)
			.then(function(categories) {
				var categoriesArr = [];
				for (var i = 0; i < categories.length; i++) {
					categoriesArr.push(categories[i].id);
				}
				otherModelWherePart.categoryWherePart = {};
				otherModelWherePart.categoryWherePart.id = {
					$in: categoriesArr
				};
			}));
	}


	return models.sequelize.Promise.all(promiseArr)
		.then(function() {
			return _findCourseList(params, wherePart, otherModelWherePart);
		});

}



function _findCourseList(params, wherePart, otherModelWherePart) {
	return models.Course.findAll({
		where: wherePart,
		attributes: params.simple == true ? ['id', 'title', 'price', 'status', 'rating', 'ratingCount', 'teacherId', 'categoryId', 'createdAt'] : ['id', 'title', 'price', 'status', 'rating', 'ratingCount', 'describe', 'teacherId', 'categoryId', 'createdAt'],
		limit: params.pageSize,
		offset: (params.pageNumber - 1) * params.pageSize,
		order: params.orderBy,
		include: [{
			model: models.User,
			as: "teacher",
			attributes: ['id', 'nickname', 'gender', 'age']
		}, {
			model: models.Category,
			as: "category",
			attributes: ['id', 'name'],
			where: otherModelWherePart.categoryWherePart
		}, {
			model: models.District,
			as: "districts",
			attributes: ['id', 'name', 'fullName'],
			where: otherModelWherePart.districtWherePart
		}, {
			model: models.CoursePic,
			as: "pics",
			attributes: ['name']
		}, {
			model: models.CourseType,
			as: "types",
			attributes: ['id']
		}, {
			model: models.CourseSite,
			as: "sites",
			attributes: ['id']
		}],
	});
}