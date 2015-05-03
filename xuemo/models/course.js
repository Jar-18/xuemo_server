"use strict";

module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    rating: { //针对评分做的冗余
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    ratingCount: { //针对评分做的冗余
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    describe: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {
          as: "teacher"
        });
        Course.belongsTo(models.Category, {
          as: "category"
        });
        Course.hasMany(models.District, {
          as: "districts",
          through: models.CourseDistrict,
          foreignKey: "courseId"
        });
        Course.hasMany(models.CourseRating, {
          as: "ratings",
          foreignKey: "courseId"
        });
        Course.hasMany(models.CoursePic, {
          as: "pics",
          foreignKey: "courseId"
        });
        Course.hasMany(models.Appointment, {
          as: "appointments",
          foreignKey: "courseId"
        });
        Course.hasMany(models.CourseSite, {
          as: "sites",
          foreignKey: "courseId"
        });
        Course.hasMany(models.CourseType, {
          as: "types",
          foreignKey: "courseId"
        });
      }
    }
  });

  return Course;
};