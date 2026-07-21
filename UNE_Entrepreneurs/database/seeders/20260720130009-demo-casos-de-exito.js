'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('casos_de_exito', [
      {
        id: 1,
        nombre: 'Damaris',
        profesion: 'Artesana',
        ubicacion: 'Emprendedora',
        cita: 'Confiaron en mí, en mi capacidad, y lo más bonito es ver cómo se realizan mis sueños, ver mi taller creciendo gracias a las oportunidades que nos han dado.',
        imagen: '/assets/Damaris.png',
        color_tag: '#60a5fa',
        activo: true,
        fecha: new Date('2026-03-24T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Ginette',
        profesion: 'Artesana',
        ubicacion: 'Emprendedora',
        cita: 'A mí esto me ha abierto mucho los ojos. Ahora entiendo que si quiero que mi negocio crezca tengo que ordenarme.',
        imagen: '/assets/Ginette.png',
        color_tag: '#4ade80',
        activo: true,
        fecha: new Date('2026-03-24T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Katherine',
        profesion: 'Panadera',
        ubicacion: 'Emprendedora',
        cita: 'Esta ha sido una experiencia muy bonita, con compañeras muy buenas y una guía que está siempre presente.',
        imagen: '/assets/katherine.png',
        color_tag: '#f472b6',
        activo: true,
        fecha: new Date('2026-03-24T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Marielos',
        profesion: 'Cocinera',
        ubicacion: 'Bagaces',
        cita: 'Hoy estamos de fiesta por saber que las mujeres de Bagaces fueron escuchadas por UNE.',
        imagen: '/assets/Marielos.png',
        color_tag: '#facc15',
        activo: true,
        fecha: new Date('2026-03-24T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Carolina',
        profesion: 'Agricultora Sustentable',
        ubicacion: 'Liberia',
        cita: 'Gracias al crédito y la capacitación, mi granja hidropónica ahora provee a tres supermercados de la zona.',
        imagen: '/assets/Damaris.png',
        color_tag: '#2dd4bf',
        activo: true,
        fecha: new Date('2026-03-25T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nombre: 'Sofia',
        profesion: 'Diseñadora de Modas',
        ubicacion: 'San José',
        cita: 'Aprender sobre estructuración de costos cambió por completo mi modelo de negocio.',
        imagen: '/assets/Ginette.png',
        color_tag: '#a78bfa',
        activo: true,
        fecha: new Date('2026-03-26T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        nombre: 'Brenda',
        profesion: 'Dueña de Cafetería',
        ubicacion: 'Heredia',
        cita: 'Encontrar a otras emprendedoras con los mismos desafíos me dio la fuerza para seguir adelante y mejorar.',
        imagen: '/assets/katherine.png',
        color_tag: '#fbbf24',
        activo: true,
        fecha: new Date('2026-03-27T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        nombre: 'Valeria',
        profesion: 'Artesana Digital',
        ubicacion: 'Cartago',
        cita: 'Logré lanzar mi tienda en línea en 3 meses siguiendo los pasos de la mentoría de SÜRIA.',
        imagen: '/assets/Marielos.png',
        color_tag: '#38bdf8',
        activo: true,
        fecha: new Date('2026-03-28T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        nombre: 'Carmen',
        profesion: 'Repostera Artesanal',
        ubicacion: 'Alajuela',
        cita: 'La disciplina de llevar mi inventario organizado y mis finanzas claras me salvó de la quiebra.',
        imagen: '/assets/Damaris.png',
        color_tag: '#f87171',
        activo: true,
        fecha: new Date('2026-03-29T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('casos_de_exito', null, {});
  }
};
