"use strict";

module.exports = function(sequelize, DataTypes) {
  var CoursePic = sequelize.define("CoursePic", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      path: {
        type: DataTypes.STRING
      }
  }, {
    classMethods: {
      associate: function(models) {
        //CoursePic.belongsTo(models.Course);
      }
    }
  });

  return CoursePic;
};