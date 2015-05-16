"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserLocation = sequelize.define("UserLocation", {
    userId: {
      type: DataTypes.INTEGER
    },
    lat: DataTypes.DECIMAL(9, 6), //纬度
    lng: DataTypes.DECIMAL(9, 6), //经度
    geohash: DataTypes.STRING,
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        UserLocation.belongsTo(models.User, {
          as: "user",
          foreignKey: "userId"
        });
      }
    }
  });

  return UserLocation;
};