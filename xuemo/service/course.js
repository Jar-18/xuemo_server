var models = require('../models');
var districtService = require('./district');
var categoryService = require('./category');

exports.findCourseList = function(params) {

  var promiseArr = [];
  var otherFilters = {};

  if ('latest' == params.orderBy) {
    params.orderBy = 'updatedAt DESC';
  } else if ('rating' == params.orderBy) {
    params.orderBy = 'rating DESC';
  } else if ('hotest' == params.orderBy) {
    params.orderBy = 'ratingCount DESC';
  } else {
    params.orderBy = 'updatedAt DESC';
  }

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
      for (var i = 0; i < courses.length; i++) {
        courseIdArr.push(courses[i].id);
      }
      return _findCourseList(params, courseIdArr);
    });
}

exports.findCourseById = function(courseId) {
  return models.Course.find({
    where: {
      id: courseId
    },
    attributes: [
      'id', 'title', 'price', 'status', 'rating', 'ratingCount', 'describe', 'teacherId', 'categoryId',
    ],
    include: [{
      model: models.User,
      as: "teacher",
      attributes: ['id', 'nickname', 'gender', 'age', 'portrait', 'motto']
    }, {
      model: models.Category,
      as: "category",
      attributes: ['id', 'name']
    }, {
      model: models.District,
      as: "districts",
      attributes: ['id', 'name', 'fullName']
    }, {
      model: models.CoursePic,
      as: "pics",
      attributes: ['name'],
    }, {
      model: models.CourseType,
      as: "types",
      attributes: ['id']
    }, {
      model: models.CourseSite,
      as: "sites",
      attributes: ['id']
    }]
  });
}

exports.createCourse = function(params) {
  return models.sequelize.transaction(function(t) {
    return models.Course.create({
      title: params.title,
      price: params.price,
      describe: params.describe,
      teacherId: params.teacher.id,
      categoryId: params.category.id,
    }, {
      transaction: t
    }).then(function(course) {
      //Temp
      courseId = course.id;
      var promiseArr = [];
      var sites = params.sites;
      if (sites != null) {
        console.log("" + sites);
        sites.forEach(function(site) {
          promiseArr.push(models.CourseSite.create({
            id: site.id,
            courseId: course.id
          }, {
            transaction: t
          }));
        });
      }
      var types = params.types;
      if (types != null) {
        types.forEach(function(type) {
          promiseArr.push(models.CourseType.create({
            id: type.id,
            courseId: course.id
          }, {
            transaction: t
          }));
        });
      }
      var districts = params.districts;
      if (districts != null) {
        districts.forEach(function(district) {
          promiseArr.push(models.CourseDistrict.create({
            courseId: course.id,
            districtId: district.id
          }, {
            transaction: t
          }));
        })
      }
      return models.sequelize.Promise.all(promiseArr);
    });
  });
}

exports.updateCourse = function(params) {
  return models.sequelize.transaction(function(t) {
    return models.Course.find({
        where: {
          id: params.courseId
        }
      }, {
        transaction: t
      })
      .then(function(course) {
        var promiseArr = [];
        promiseArr.push(course.updateAttributes({
          describe: params.describe
        }, {
          transaction: t
        }));
        var pics = params.pics;
        if (pics != null) {
          pics.forEach(function(pic) {
            promiseArr.push(models.CoursePic.create({
              courseId: params.courseId,
              name: pic.id
            }, {
              transaction: t
            }));
          });
        }
        return models.sequelize.Promise.all(promiseArr);
      });
  });
}

function _findCourseIdList(params, otherFilters) {
  var whereArr = [" 1 = 1 "];
  if (params.exceptCourseId != null) {
    whereArr[0] += (" and id <> ? ");
    whereArr.push(params.exceptCourseId);
  }
  if (params.teacherId != null) {
    whereArr[0] += (" and teacherId = ? ");
    whereArr.push(params.teacherId);
  }
  if (otherFilters.districtArr != null) {
    whereArr[0] += " and exists(select * from courseDistricts as cd where Course.id = cd.courseId and cd.districtId in (?)) ";
    whereArr.push(otherFilters.districtArr);
  }
  if (otherFilters.categoryArr != null) {
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
    attributes: ['id', 'title', 'price', 'status', 'rating', 'ratingCount', 'teacherId', 'categoryId', 'createdAt', 'updatedAt'],
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