'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentPeriod = sequelize.define('PaymentPeriod', {
    Description: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    IsClosed: DataTypes.BOOLEAN,
    TimeId: DataTypes.STRING
  }, {});
  PaymentPeriod.associate = function(models) {
    PaymentPeriod.hasMany(models.PaymentConfiguration, {
      foreignKey:'PaymentPeriodId'
    });
  };
  return PaymentPeriod;
};