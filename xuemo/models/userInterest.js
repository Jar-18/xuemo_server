"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserInterest = sequelize.define("UserInterest", {
    userId: {
      type: DataTypes.INTEGER
    },
    interestId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        UserInterest.belongsTo(models.User, {
          as: "user",
          foreignKey: "userId"
        });
      }
    }
  });

  return UserInterest;
};