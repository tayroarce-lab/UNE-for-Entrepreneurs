'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contenido_recursos', [
      {
        id: 1,
        titulo: 'Guía para Registro Pyme',
        descripcion: 'Instrucciones detalladas de cómo registrarse como pyme en MEIC.',
        tipo: 'Guía',
        enlace: 'https://www.meic.go.cr/pyme/',
        imagen: '/assets/recurso1.png',
        activo: true,
        fecha: new Date('2026-03-23T10:00:00Z'),
        id_autor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        titulo: 'Plantilla de Control de Gastos',
        descripcion: 'Excel automatizado para llevar el control diario de tus ingresos y egresos.',
        tipo: 'Plantilla',
        enlace: '#',
        imagen: '/assets/recurso2.png',
        activo: true,
        fecha: new Date('2026-03-25T10:00:00Z'),
        id_autor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        titulo: 'Manual de Identidad Visual',
        descripcion: 'Aprende los conceptos básicos para crear logos y paletas de color impactantes.',
        tipo: 'Documento',
        enlace: '#',
        imagen: '/assets/recurso3.png',
        activo: true,
        fecha: new Date('2026-03-26T10:00:00Z'),
        id_autor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        titulo: 'Curso de Redes Sociales para Pymes',
        descripcion: 'Video tutorial de 2 horas sobre las mejores estrategias para Instagram y Facebook.',
        tipo: 'Video',
        enlace: '#',
        imagen: '/assets/recurso4.png',
        activo: true,
        fecha: new Date('2026-03-27T10:00:00Z'),
        id_autor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        titulo: 'Taller de Finanzas Personales',
        descripcion: 'Separa tu dinero personal del dinero del negocio con esta metodología aprobada.',
        tipo: 'Taller',
        enlace: '#',
        imagen: '/assets/recurso1.png',
        activo: true,
        fecha: new Date('2026-03-28T10:00:00Z'),
        id_autor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        titulo: 'Checklist para Ferias y Eventos',
        descripcion: 'No olvides nada al momento de participar en una feria comercial externa.',
        tipo: 'Herramienta',
        enlace: '#',
        imagen: '/assets/recurso3.png',
        activo: true,
        fecha: new Date('2026-03-29T10:00:00Z'),
        id_autor: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contenido_recursos', null, {});
  }
};
