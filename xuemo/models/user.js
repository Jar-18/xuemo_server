"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    portrait: DataTypes.STRING,
    motto: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Course, {
          as: "courses",
          foreignKey: "teacherId"
        });
        User.hasMany(models.CourseRating, {
          as: "ratings",
          foreignKey: "commentatorId"
        });
        User.hasMany(models.Appointment, {
          as: "appointments",
          foreignKey: "applicantId"
        });
      }
    }
  });

  return User;
};