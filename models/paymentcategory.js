'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentCategory = sequelize.define('PaymentCategory', {
    Description: DataTypes.STRING,
    IsEnabled: DataTypes.BOOLEAN,
    RevenueCode: DataTypes.STRING
  }, {});
  PaymentCategory.associate = function(models) {
    PaymentCategory.hasMany(models.PaymentConfiguration, {
      foreignKey:'CategoryId'
    });
  };
  return PaymentCategory;
};