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
    location: DataTypes.STRING,
    longitude: DataTypes.FLOAT, //经度
    dimensionality: DataTypes.FLOAT, //纬度
    startTime: DataTypes.DATE,
    attendantCount: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        Activity.belongsTo(models.Category, {
          as: "category",
          foreignKey: "categoryId"
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
      }
    }
  });

  return Activity;
};