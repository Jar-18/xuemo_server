"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseSite = sequelize.define("CourseSite", {
      id: {
        type: DataTypes.INTEGER
      },
  }, {
    timestamps: false
  });

  return CourseSite;
};