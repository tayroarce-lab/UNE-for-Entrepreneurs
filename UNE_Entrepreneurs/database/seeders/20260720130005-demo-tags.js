'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = [
      "pymes", "capitalTrabajo", "agricultura", "mujer", "joven", 
      "tecnología", "exportación", "turismo", "microempresa", 
      "sostenibilidad", "verde", "emprendimiento", "innovación", 
      "manufactura", "artesanía", "inversión", "servicios", "comercio"
    ];

    const tagRecords = tags.map((tag, index) => ({
      id: index + 1,
      nombre: tag,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('tags', tagRecords, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
