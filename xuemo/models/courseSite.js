"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseSite = sequelize.define("CourseSite", {
      id: {
        type: DataTypes.INTEGER,
        //primaryKey: true
      },
      courseId: {
        type: DataTypes.INTEGER,
        //primaryKey: true
      }

  }, {
      timestamps: false
  });

  return CourseSite;
};