'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recurso_tags', [
      // Recurso 1: Guía para Registro Pyme -> pymes (1), microempresa (9), emprendimiento (12)
      { id_recurso: 1, id_tag: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_recurso: 1, id_tag: 9, createdAt: new Date(), updatedAt: new Date() },
      { id_recurso: 1, id_tag: 12, createdAt: new Date(), updatedAt: new Date() },

      // Recurso 2: Plantilla de Control de Gastos -> pymes (1), capitalTrabajo (2)
      { id_recurso: 2, id_tag: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_recurso: 2, id_tag: 2, createdAt: new Date(), updatedAt: new Date() },

      // Recurso 3: Manual de Identidad Visual -> innovación (13), artesanía (15)
      { id_recurso: 3, id_tag: 13, createdAt: new Date(), updatedAt: new Date() },
      { id_recurso: 3, id_tag: 15, createdAt: new Date(), updatedAt: new Date() },

      // Recurso 4: Curso de Redes Sociales para Pymes -> tecnología (6), innovación (13)
      { id_recurso: 4, id_tag: 6, createdAt: new Date(), updatedAt: new Date() },
      { id_recurso: 4, id_tag: 13, createdAt: new Date(), updatedAt: new Date() },

      // Recurso 5: Taller de Finanzas Personales -> capitalTrabajo (2), inversión (16)
      { id_recurso: 5, id_tag: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_recurso: 5, id_tag: 16, createdAt: new Date(), updatedAt: new Date() },

      // Recurso 6: Checklist para Ferias y Eventos -> pymes (1), comercio (18)
      { id_recurso: 6, id_tag: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_recurso: 6, id_tag: 18, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recurso_tags', null, {});
  }
};
