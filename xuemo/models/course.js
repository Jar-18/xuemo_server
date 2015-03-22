"use strict";

module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {as: "teacher"});
        Course.belongsTo(models.Category, {as: "category"});
        Course.belongsToMany(models.District, {as: "districts", through: "CourseDistricts"});
        Course.belongsToMany(models.User, {as: "ratings", through: models.CourseRating});
        Course.hasMany(models.CoursePic, {as: "pics"})
      }
    }
  });

  return Course;
};