"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseRating = sequelize.define("CourseRating", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.FLOAT
      }
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return CourseRating;
};