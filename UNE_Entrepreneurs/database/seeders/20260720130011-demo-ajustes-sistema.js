'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ajustes_sistema', [
      {
        id: 1,
        une_loan_max: 500000.00,
        commission: 0.0100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ajustes_sistema', null, {});
  }
};
