"use strict";

module.exports = function(sequelize, DataTypes) {
  var Follower = sequelize.define("Follower", {
    followerId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    attentionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  }, {
    timestamps: true,
  });

  return Follower;
};