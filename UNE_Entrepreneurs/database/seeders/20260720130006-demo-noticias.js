'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('noticias', [
      {
        id: 1,
        titulo: 'UNE lanza nuevo programa de microcréditos 2026',
        contenido: 'Nuestro nuevo programa está enfocado en jóvenes emprendedores de zonas rurales, con tasas preferenciales y acompañamiento técnico especializado.',
        imagen: '/news/news2.png',
        id_autor: 1, // Admin UNE
        activa: true,
        fecha: new Date('2026-03-10T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        titulo: 'Cumbre de Emprendimiento UNE en San José',
        contenido: 'Más de 500 emprendedores se reunieron para compartir estrategias de crecimiento y networking en la capital. Un evento sin precedentes para el país.',
        imagen: '/news/news1.png',
        id_autor: 1, // Admin UNE
        activa: true,
        fecha: new Date('2026-03-12T15:30:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        titulo: "Historias de Éxito: El renacer de 'Sabor del Pueblo'",
        contenido: "Conozca cómo Carlos Méndez transformó su pequeño puesto de comida en una cadena de locales gracias al apoyo financiero y técnico de la red UNE.",
        imagen: '/news/news3.png',
        id_autor: 1, // Admin UNE
        activa: true,
        fecha: new Date('2026-03-15T09:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        titulo: 'Digitalización obligatoria para pymes en 2026',
        contenido: 'Las nuevas normativas exigen que todos los negocios tengan presencia digital. UNE ofrece herramientas gratuitas para que este proceso sea sencillo y rápido.',
        imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        id_autor: 1, // Admin UNE
        activa: true,
        fecha: new Date('2026-03-18T11:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        titulo: 'Impacto',
        contenido: 'Prueba',
        imagen: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop',
        id_autor: 1, // Admin UNE
        activa: true,
        fecha: new Date('2026-03-19T17:41:39.501Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        titulo: 'Süria lanza programa de formación digital avanzada',
        contenido: 'Las emprendedoras podrán capacitarse en marketing digital y e-commerce durante este semestre.',
        imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop',
        id_autor: 2, // Equipo SÜRIA -> María López
        activa: true,
        fecha: new Date('2026-04-01T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        titulo: 'Nuevas alianzas comerciales para exportación',
        contenido: 'UNE confirma alianza con mercados internacionales para facilitar la exportación de productos locales.',
        imagen: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop',
        id_autor: 1, // Admin UNE
        activa: true,
        fecha: new Date('2026-04-05T09:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        titulo: 'Feria Nacional de Pymes 2026: Inscripciones Abiertas',
        contenido: 'Reserva tu espacio para la feria más grande del año. Habrá más de 200 stands disponibles.',
        imagen: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
        id_autor: 1, // Admin UNE
        activa: true,
        fecha: new Date('2026-04-10T14:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        titulo: 'Cómo administrar tus inventarios eficientemente',
        contenido: 'Descubre las mejores prácticas y herramientas para mantener tu inventario al día sin perder rentabilidad.',
        imagen: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop',
        id_autor: 3, // Equipo Técnico -> Tayro Arce
        activa: true,
        fecha: new Date('2026-04-12T11:30:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        titulo: 'Testimonios que inspiran: El valor de SÜRIA',
        contenido: 'Las emprendedoras de Guanacaste comparten cómo el programa ha transformado sus negocios familiares.',
        imagen: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop',
        id_autor: 2, // Equipo SÜRIA -> María López
        activa: true,
        fecha: new Date('2026-04-15T16:20:00Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('noticias', null, {});
  }
};
