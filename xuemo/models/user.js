"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nickname: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    age: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Course, {as: "teacher"});
      }
    }
  });

  return User;
};