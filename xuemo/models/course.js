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
    rating: DataTypes.FLOAT, //针对评分做的冗余
    ratingAmount: DataTypes.FLOAT, //针对评分做的冗余
    type: DataTypes.INTEGER, //一对一，小班，大班
    site: DataTypes.INTEGER, //学生家，老师家，公共场所
    describle: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {as: "teacher"});
        Course.belongsTo(models.Category, {as: "category"});
        Course.belongsToMany(models.District, {as: "districts", through: models.CourseDistricts});
        Course.hasMany(models.CourseRating, {as: "ratings"});
        Course.hasMany(models.CoursePic, {as: "pics"})
      }
    }
  });

  return Course;
};