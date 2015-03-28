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
      },
      comment: {
        type: DataTypes.STRING
      }
  }, {
    classMethods: {
      associate: function(models) {
        models.CourseRating.belongsTo(models.User, {as:"commentator"});
      }
    }
  });

  return CourseRating;
};