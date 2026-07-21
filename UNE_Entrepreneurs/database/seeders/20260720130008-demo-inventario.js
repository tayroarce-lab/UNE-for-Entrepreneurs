'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('inventario', [
      {
        id: 1,
        id_usuario: 6, // Test User (userId: 854F0OV)
        nombre: 'Cajas de Carton',
        categoria: 'Materiales',
        precio: 500.00,
        stock: 50,
        stock_minimo: 10,
        unidad: 'Unidades',
        createdAt: new Date('2026-03-29T14:03:20.657Z'),
        updatedAt: new Date('2026-03-29T14:03:20.657Z')
      },
      {
        id: 2,
        id_usuario: 3, // Tayro Arce (userId: CeBL9TA)
        nombre: 'Empaque',
        categoria: 'Materia prima',
        precio: 5000.00,
        stock: 50,
        stock_minimo: 10,
        unidad: 'Unidades',
        createdAt: new Date('2026-03-29T15:08:07.110Z'),
        updatedAt: new Date('2026-03-29T15:08:07.110Z')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('inventario', null, {});
  }
};
