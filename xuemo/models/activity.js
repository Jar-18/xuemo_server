"use strict";

module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    categoryId: DataTypes.INTEGER,
    hostId: DataTypes.INTEGER,
    describe: DataTypes.STRING,
    districtId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    lat: DataTypes.DECIMAL(9,6), //纬度
    lng: DataTypes.DECIMAL(9,6), //经度
    geohash: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    attendantCount: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    indexes: [{
      fields: ['geohash']
    }],
    classMethods: {
      associate: function(models) {
        Activity.belongsTo(models.Category, {
          as: "category",
          foreignKey: "categoryId"
        });
        Activity.belongsTo(models.District, {
          as: "district",
          foreignKey: "districtId"
        });
        Activity.belongsTo(models.User, {
          as: "host",
          foreignKey: "hostId"
        });
        Activity.hasMany(models.User, {
          as: "attendants",
          through: models.ActivityAttendant,
          foreignKey: "activityId"
        });
        Activity.hasMany(models.ActivityPic, {
          as: "pics",
          foreignKey: "activityId"
        })
      }
    }
  });

  return Activity;
};