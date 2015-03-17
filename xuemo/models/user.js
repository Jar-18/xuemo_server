"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    gender: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Task)
      }
    }
  });

  return User;
};