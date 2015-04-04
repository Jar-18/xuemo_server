"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseType = sequelize.define("CourseType", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.INTEGER
      },
  }, {
      timestamps: false  
  });

  return CourseType;
};