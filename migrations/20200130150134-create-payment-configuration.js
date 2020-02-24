'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PaymentConfigurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ConfigDescription: {
        type: Sequelize.STRING
      },
      IsEnabled: {
        type: Sequelize.BOOLEAN
      },
      PaymentCode: {
        type: Sequelize.STRING
      },
      MinimumPayment: {
        type: Sequelize.FLOAT
      },
      MaximumPayment: {
        type: Sequelize.FLOAT
      },
      CallBackHookURL: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('PaymentConfigurations');
  }
};