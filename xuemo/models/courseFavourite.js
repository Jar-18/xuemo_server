"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseFavourite = sequelize.define("CourseFavourite", {
    userId: {
      type: DataTypes.INTEGER,
    },
    courseId: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: true,
  });

  return CourseFavourite;
};