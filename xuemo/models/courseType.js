"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseType = sequelize.define("CourseType", {
      id: {
        type: DataTypes.INTEGER
      },
      // type: {
      //   type: DataTypes.INTEGER
      // },
  }, {
      timestamps: false  
  });

  return CourseType;
};