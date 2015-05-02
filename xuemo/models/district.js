"use strict";

module.exports = function(sequelize, DataTypes) {
  var District = sequelize.define("District", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    fullName: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        District.belongsTo(District, {
          as: "parent"
        });
        District.belongsToMany(models.Course, {
          through: models.CourseDistrict,
          foreignKey: "districtId"
        });
      }
    }
  });

  return District;
};