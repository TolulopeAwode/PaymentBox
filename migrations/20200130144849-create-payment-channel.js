'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PaymentChannels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ChannelName: {
        type: Sequelize.STRING
      },
      ProductId: {
        type: Sequelize.STRING
      },
      PaymentItemId: {
        type: Sequelize.STRING
      },
      Mackey: {
        type: Sequelize.STRING
      },
      RedirectURL: {
        type: Sequelize.STRING
      },
      QueryURL: {
        type: Sequelize.STRING
      },
      PaymentCharges: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('PaymentChannels');
  }
};