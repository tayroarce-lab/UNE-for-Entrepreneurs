'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('solicitudes_contacto', [
      {
        id: 1,
        nombre: 'Yeruza',
        telefono: '82391',
        email: 'amoreragfwd@gmail.com',
        ubicacion: 'Puntarenas chacarita',
        negocio: 'Porque si',
        mensaje: 'Me gusta la plata también\n',
        fecha_registro: new Date('2026-03-25T14:30:04.389Z'),
        estado: 'Pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Tayro',
        telefono: '85697537',
        email: 'tarcebfwd@gmail.com',
        ubicacion: 'Puntarenas chacarita',
        negocio: 'Porque si',
        mensaje: 'Ayyiyi',
        fecha_registro: new Date('2026-03-25T14:40:22.892Z'),
        estado: 'Pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('solicitudes_contacto', null, {});
  }
};
