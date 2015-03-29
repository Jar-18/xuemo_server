"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseDistrict = sequelize.define("CourseDistrict", {
      //No more attributes
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return CourseDistrict;
};