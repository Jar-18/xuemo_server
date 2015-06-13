"use strict";

module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    courseId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    applicantId: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        models.Appointment.belongsTo(models.User, {
          as: "applicant",
          foreignKey: "applicantId"
        });
        models.Appointment.belongsTo(models.Course, {
          as: "appliedCourse",
          foreignKey: "courseId"
        });
      }
    }
  });

  return Appointment;
};