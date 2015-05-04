"use strict";

module.exports = function(sequelize, DataTypes) {
  var ActivityPic = sequelize.define("ActivityPic", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    activityId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });

  return ActivityPic;
};