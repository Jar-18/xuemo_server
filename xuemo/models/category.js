"use strict";

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: DataTypes.INTEGER,
      name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasOne(Category, {foreignKey: 'parentId'});
      }
    }
  });

  return Category;
};