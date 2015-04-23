"use strict";

module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define("Interest", {
    id: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
  });

  return Interest;
};