"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseDistrict = sequelize.define("CourseDistrict", {
    //No more attributes
  }, {
    timestamps: false,
  });

  return CourseDistrict;
};