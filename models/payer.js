'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payer = sequelize.define('Payer', {
    FullName: DataTypes.STRING,
    IsEnabled: DataTypes.BOOLEAN,
    EmailAddress: DataTypes.STRING,
    IdentityKey: DataTypes.STRING
  }, {});
  Payer.associate = function(models) {
    Payer.hasMany(models.TransactionLog, {
      foreignKey:'PayerId'
    });
  };
  return Payer;
};