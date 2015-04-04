"use strict";

module.exports = function(sequelize, DataTypes) {
  var CoursePic = sequelize.define("CoursePic", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      }
  }, {
    timestamps: false
  });

  return CoursePic;
};