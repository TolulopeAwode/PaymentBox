'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    Name: DataTypes.STRING,
    Acronym: DataTypes.STRING,
    BankSplitCode: DataTypes.STRING,
    isEnabled: DataTypes.BOOLEAN
  }, {});
  Bank.associate = function(models) {
    Bank.hasMany(models.SchoolAccount, {
      foreignKey:'BankId'
    });
  };
  return Bank;
};