export interface User {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  rol?: string;
  avatar?: string;
  url_foto_perfil?: string;
  createdAt?: string;
}
