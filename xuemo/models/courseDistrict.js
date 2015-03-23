"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseDistricts = sequelize.define("CourseDistricts", {
      //No more attributes
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return CourseDistricts;
};