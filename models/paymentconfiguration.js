'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentConfiguration = sequelize.define('PaymentConfiguration', {
    ConfigDescription: DataTypes.STRING,
    IsEnabled: DataTypes.BOOLEAN,
    PaymentCode: DataTypes.STRING,
    MinimumPayment: DataTypes.FLOAT,
    MaximumPayment: DataTypes.FLOAT,
    CallBackHookURL: DataTypes.STRING,
    SchoolAccountId: DataTypes.INTEGER,
    PaymentPeriodId: DataTypes.INTEGER,
    ChannelId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER

  }, {});
  PaymentConfiguration.associate = function(models) {
    PaymentConfiguration.hasMany(models.TransactionLog, {
      foreignKey:'ConfigurationId'
    });
  };
  return PaymentConfiguration;
};