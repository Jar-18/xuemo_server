"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseSite = sequelize.define("CourseSite", {
      id2: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
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