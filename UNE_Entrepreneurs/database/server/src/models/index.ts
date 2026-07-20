import sequelize from '../config/db.config';
import User, { UserAttributes } from './user.model';
import EmpresaProyecto, { EmpresaProyectoAttributes } from './empresa.model';
import HitoMeta from './hito.model';
import ContenidoRecurso from './recurso.model';
import Noticia from './noticia.model';
import Transaccion from './transaccion.model';
import Inventario from './inventario.model';
import CasoExito from './casoExito.model';
import SolicitudContacto from './solicitudContacto.model';
import AjusteSistema from './ajustes.model';
import Tag from './tag.model';

// Initialize Models
User.initialize(sequelize);
EmpresaProyecto.initialize(sequelize);
HitoMeta.initialize(sequelize);
ContenidoRecurso.initialize(sequelize);
Noticia.initialize(sequelize);
Transaccion.initialize(sequelize);
Inventario.initialize(sequelize);
CasoExito.initialize(sequelize);
SolicitudContacto.initialize(sequelize);
AjusteSistema.initialize(sequelize);
Tag.initialize(sequelize);

// Establish Associations

// User <-> EmpresaProyecto (Propietario)
User.hasMany(EmpresaProyecto, {
  foreignKey: 'id_propietario',
  as: 'proyectos',
  onDelete: 'CASCADE',
});
EmpresaProyecto.belongsTo(User, {
  foreignKey: 'id_propietario',
  as: 'propietario',
});

// EmpresaProyecto <-> HitoMeta
EmpresaProyecto.hasMany(HitoMeta, {
  foreignKey: 'id_proyecto',
  as: 'hitos',
  onDelete: 'CASCADE',
});
HitoMeta.belongsTo(EmpresaProyecto, {
  foreignKey: 'id_proyecto',
  as: 'proyecto',
});

// User <-> ContenidoRecurso (Autor)
User.hasMany(ContenidoRecurso, {
  foreignKey: 'id_autor',
  as: 'recursos',
  onDelete: 'CASCADE',
});
ContenidoRecurso.belongsTo(User, {
  foreignKey: 'id_autor',
  as: 'autor',
});

// User <-> Noticia (Autor)
User.hasMany(Noticia, {
  foreignKey: 'id_autor',
  as: 'noticias',
  onDelete: 'CASCADE',
});
Noticia.belongsTo(User, {
  foreignKey: 'id_autor',
  as: 'autor',
});

// User <-> Transaccion
User.hasMany(Transaccion, {
  foreignKey: 'id_usuario',
  as: 'transacciones',
  onDelete: 'CASCADE',
});
Transaccion.belongsTo(User, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

// User <-> Inventario
User.hasMany(Inventario, {
  foreignKey: 'id_usuario',
  as: 'inventarios',
  onDelete: 'CASCADE',
});
Inventario.belongsTo(User, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

// ContenidoRecurso <-> Tag (Many-to-Many via recurso_tags)
ContenidoRecurso.belongsToMany(Tag, {
  through: 'recurso_tags',
  foreignKey: 'id_recurso',
  otherKey: 'id_tag',
  as: 'tags',
  onDelete: 'CASCADE',
});
Tag.belongsToMany(ContenidoRecurso, {
  through: 'recurso_tags',
  foreignKey: 'id_tag',
  otherKey: 'id_recurso',
  as: 'recursos',
  onDelete: 'CASCADE',
});

export {
  sequelize,
  User,
  UserAttributes,
  EmpresaProyecto,
  EmpresaProyectoAttributes,
  HitoMeta,
  ContenidoRecurso,
  Noticia,
  Transaccion,
  Inventario,
  CasoExito,
  SolicitudContacto,
  AjusteSistema,
  Tag,
};
