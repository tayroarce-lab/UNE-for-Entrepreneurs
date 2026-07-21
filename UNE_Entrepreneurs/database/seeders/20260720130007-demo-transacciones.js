'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transacciones', [
      {
        id: 1,
        id_usuario: 3, // Tayro Arce (userId: CeBL9TA)
        descripcion: 'Venta de algo ',
        monto: 5000.00,
        tipo: 'income',
        categoria: 'Venta de Productos',
        fecha: new Date('2026-03-19T20:10:43.341Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transacciones', null, {});
  }
};
