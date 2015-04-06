"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseType = sequelize.define("CourseType", {
      id2: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.INTEGER
      },
  }, {
      timestamps: false  
  });

  return CourseType;
};