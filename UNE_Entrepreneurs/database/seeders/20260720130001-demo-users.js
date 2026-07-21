'use strict';

let bcrypt;
try {
  bcrypt = require('bcryptjs');
} catch (e) {
  bcrypt = require('../server/node_modules/bcryptjs');
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHashDefault = await bcrypt.hash('Admin123!', 10);
    const passwordHash123456 = await bcrypt.hash('123456', 10);
    const passwordHashUser123 = await bcrypt.hash('User123!', 10);
    
    await queryInterface.bulkInsert('usuarios', [
      {
        id: 1,
        nombre: 'Admin UNE',
        email: 'admin@une.cr',
        password: passwordHashDefault,
        rol: 'admin',
        url_foto_perfil: '/news/news2.png', // Default profile image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'María López',
        email: 'maria@example.com',
        password: passwordHashDefault,
        rol: 'emprendedor',
        url_foto_perfil: '/assets/Damaris.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Tayro Arce',
        email: 'maria@correo.com',
        password: passwordHash123456,
        rol: 'emprendedor',
        url_foto_perfil: '/assets/tayro_arce.png',
        createdAt: new Date('2026-03-16T17:20:51.644Z'),
        updatedAt: new Date('2026-03-16T17:20:51.644Z')
      },
      {
        id: 4,
        nombre: 'Nora Figueroa',
        email: 'nora@fwd.com',
        password: passwordHash123456,
        rol: 'emprendedor',
        url_foto_perfil: '/assets/nora_figueroa.png',
        createdAt: new Date('2026-03-17T20:01:42.151Z'),
        updatedAt: new Date('2026-03-17T20:01:42.151Z')
      },
      {
        id: 5,
        nombre: 'Admin User',
        email: 'admin@correo.com',
        password: passwordHashDefault,
        rol: 'admin',
        url_foto_perfil: null,
        createdAt: new Date('2026-03-26T21:20:23.894Z'),
        updatedAt: new Date('2026-03-26T21:20:23.894Z')
      },
      {
        id: 6,
        nombre: 'Test User',
        email: 'test@test.com',
        password: passwordHashUser123,
        rol: 'emprendedor',
        url_foto_perfil: null,
        createdAt: new Date('2026-03-29T14:02:10.731Z'),
        updatedAt: new Date('2026-03-29T14:02:10.731Z')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
