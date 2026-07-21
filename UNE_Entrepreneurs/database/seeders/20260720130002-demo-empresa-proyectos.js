'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empresa_proyectos', [
      {
        id: 1,
        id_propietario: 2, // María López
        nombre: 'Süria Orgánica',
        descripcion: 'Cultivo y comercialización de productos orgánicos libres de pesticidas en la zona de Guanacaste.',
        sector: 'Agricultura',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_propietario: 2, // María López
        nombre: 'Artesanías del Puerto',
        descripcion: 'Creación de artesanías utilizando materiales marinos reciclados y madera local.',
        sector: 'Manufactura/Artesanías',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empresa_proyectos', null, {});
  }
};
