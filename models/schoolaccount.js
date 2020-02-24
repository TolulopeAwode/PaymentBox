'use strict';
module.exports = (sequelize, DataTypes) => {
  const SchoolAccount = sequelize.define('SchoolAccount', {
    AccountNumber: DataTypes.STRING,
    AccountName: DataTypes.STRING,
    isEnabled: DataTypes.BOOLEAN,
    BankId: DataTypes.INTEGER
  }, {});
  SchoolAccount.associate = function(models) {
    SchoolAccount.hasMany(models.PaymentConfiguration, {
      foreignKey:'SchoolAccountId'
    });
  };
  return SchoolAccount;
};