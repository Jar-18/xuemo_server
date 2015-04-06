"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseSite = sequelize.define("CourseSite", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      site: {
        type: DataTypes.INTEGER
      },
  }, {
      timestamps: false
  });

  return CourseSite;
};