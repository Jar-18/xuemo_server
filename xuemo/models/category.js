"use strict";

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      code: DataTypes.INTEGER,
      name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasOne(Category, {as: 'parent'});
      }
    }
  });

  return Category;
};