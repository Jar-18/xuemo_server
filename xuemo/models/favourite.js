"use strict";

module.exports = function(sequelize, DataTypes) {
  var Favourite = sequelize.define("Favourite", {
    userId: {
      type: DataTypes.INTEGER,
    },
    courseId: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: true,
  });

  return Favourite;
};