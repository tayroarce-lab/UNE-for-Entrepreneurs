'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hito_metas', [
      {
        id: 1,
        id_proyecto: 1, // Süria Orgánica
        titulo: 'Adquirir semillas orgánicas certificadas',
        estado: 'completado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_proyecto: 1, // Süria Orgánica
        titulo: 'Preparar el invernadero piloto',
        estado: 'en_progreso',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        id_proyecto: 1, // Süria Orgánica
        titulo: 'Lanzamiento del primer lote comercial',
        estado: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        id_proyecto: 2, // Artesanías del Puerto
        titulo: 'Recolectar materiales reciclados iniciales',
        estado: 'completado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        id_proyecto: 2, // Artesanías del Puerto
        titulo: 'Crear catálogo digital de productos',
        estado: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hito_metas', null, {});
  }
};
