"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseRating = sequelize.define("CourseRating", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    courseId: {
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.FLOAT
    },
    comment: {
      type: DataTypes.STRING
    },
    commentatorId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.CourseRating.belongsTo(models.User, {
          as: "commentator",
          foreignKey: "commentatorId"
        });
      }
    }
  });

  return CourseRating;
};