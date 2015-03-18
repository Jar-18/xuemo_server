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
    full_name:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        District.hasOne(District, {foreignKey: "parentId"});
        District.belongsToMany(models.Course);
      }
    }
  });

  return District;
};