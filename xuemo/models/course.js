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
        Course.belongsTo(models.User, {foreignKey: "teacherId"});
        Course.belongsTo(models.Category, {foreignKey: "categoryId"});
        Course.belongsToMany(models.District, {through: "CourseDistricts"});
      }
    }
  });

  return Course;
};