"use strict";

module.exports = function(sequelize, DataTypes) {
  var District = sequelize.define("District", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }，
    parent_id: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    full_name:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Task)
      }
    }
  });

  return District;
};