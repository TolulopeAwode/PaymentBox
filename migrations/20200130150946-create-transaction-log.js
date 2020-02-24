'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TransactionLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TransactionRefNo: {
        type: Sequelize.STRING
      },
      IsPosted: {
        type: Sequelize.BOOLEAN
      },
      ActualAmount: {
        type: Sequelize.FLOAT
      },
      ResponseCode: {
        type: Sequelize.STRING
      },
      ResponseDescription: {
        type: Sequelize.STRING
      },
      CardNumber: {
        type: Sequelize.STRING
      },
      MerchantRefNo: {
        type: Sequelize.STRING
      },
      TransactionAmount: {
        type: Sequelize.STRING
      },
      BankReferenceNo: {
        type: Sequelize.STRING
      },
      IsSuccessful: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TransactionLogs');
  }
};