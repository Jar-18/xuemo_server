"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseFavourite = sequelize.define("CourseFavourite", {
    //No more attributes
  }, {
    timestamps: false,
  });

  return CourseFavourite;
};