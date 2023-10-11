'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      category_id: DataTypes.BIGINT,
      sub_category_id: DataTypes.BIGINT,
      description: DataTypes.TEXT,
      property_type: DataTypes.STRING,
      price: DataTypes.FLOAT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );
  Service.associate = (models) => {
    Service.belongsTo(models.Category, {
      foreignKey: 'category_id',
    });
    Service.belongsTo(models.Subcategory, {
      foreignKey: 'sub_category_id',
    });
  };
  return Service;
};
