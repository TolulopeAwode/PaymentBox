'use strict';
module.exports = (sequelize, DataTypes) => {
  const TransactionLog = sequelize.define('TransactionLog', {
    TransactionRefNo: DataTypes.STRING,
    IsPosted: DataTypes.BOOLEAN,
    ActualAmount: DataTypes.FLOAT,
    ResponseCode: DataTypes.STRING,
    ResponseDescription: DataTypes.STRING,
    CardNumber: DataTypes.STRING,
    MerchantRefNo: DataTypes.STRING,
    TransactionAmount: DataTypes.STRING,
    BankReferenceNo: DataTypes.STRING,
    IsSuccessful: DataTypes.BOOLEAN
  }, {});
  TransactionLog.associate = function(models) {
    // associations can be defined here
  };
  return TransactionLog;
};