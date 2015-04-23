"use strict";

module.exports = function(sequelize, DataTypes) {
  var Follower = sequelize.define("Follower", {
    followerId: {
      type: DataTypes.INTEGER,
    },
    attentionId: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
  });

  return Follower;
};