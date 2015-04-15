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
    status: DataTypes.INTEGER,
    rating: DataTypes.DECIMAL(10,2), //针对评分做的冗余
    ratingCount: DataTypes.INTEGER, //针对评分做的冗余
    describe: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {as: "teacher"});
        Course.belongsTo(models.Category, {as: "category"});
        Course.belongsToMany(models.District, {as: "districts", through: models.CourseDistrict});
        Course.hasMany(models.CourseRating, {as: "ratings"});
        Course.hasMany(models.CoursePic, {as: "pics"});
        Course.hasMany(models.Appointment, {as: "appointments", foreignKey: "courseId"});
        Course.hasMany(models.CourseSite, {as: "sites", foreignKey: "courseId"});
        Course.hasMany(models.CourseType, {as: "types", foreignKey: "courseId"});
      }
    }
  });

  return Course;
};