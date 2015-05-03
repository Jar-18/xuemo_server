"use strict";

module.exports = function(sequelize, DataTypes) {
  var ActivityAttendant = sequelize.define("ActivityAttendant", {
    attendantId: {
      type: DataTypes.STRING
    },
    activityId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true
  });

  return ActivityAttendant;
};