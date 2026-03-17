export interface User {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt?: string;
}
