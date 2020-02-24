'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentChannel = sequelize.define('PaymentChannel', {
    ChannelName: DataTypes.STRING,
    ProductId: DataTypes.STRING,
    PaymentItemId: DataTypes.STRING,
    Mackey: DataTypes.STRING,
    RedirectURL: DataTypes.STRING,
    QueryURL: DataTypes.STRING,
    POSTURL: DataTypes.STRING,
    PaymentCharges: DataTypes.FLOAT
  }, {});
  PaymentChannel.associate = function(models) {
    PaymentChannel.hasMany(models.PaymentConfiguration, {
      foreignKey:'ChannelId'
    });
  };
  return PaymentChannel;
};