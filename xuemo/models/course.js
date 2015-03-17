"use strict";

module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    id: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Task)
      }
    }
  });

  return Course;
};