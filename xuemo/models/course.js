"use strict";

module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    id: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {as: "teacher"});
      }
    }
  });

  return Course;
};