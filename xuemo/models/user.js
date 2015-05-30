"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    account: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    nickname: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    portrait: DataTypes.STRING,
    motto: DataTypes.STRING,
    birthday: DataTypes.DATE,
    constellation: DataTypes.INTEGER
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
        User.hasMany(models.User, {
          as: "followers",
          through: models.Follower,
          foreignKey: "attentionId"
        });
        User.hasMany(models.User, {
          as: "attentions",
          through: models.Follower,
          foreignKey: "followerId"
        });
        User.hasMany(models.Interest, {
          as: "interests",
          foreignKey: "userId"
        });
        User.belongsTo(models.District, {
          as: "district",
          foreignKey: "districtId"
        });
        User.hasMany(models.Activity, {
          as: "activities",
          through: models.ActivityAttendant,
          foreignKey: "attendantId"
        });
        User.belongsToMany(models.Course, {
          as: "courseFavourites",
          through: models.CourseFavourite,
          foreignKey: "userId"
        });
      }
    }
  });

  return User;
};