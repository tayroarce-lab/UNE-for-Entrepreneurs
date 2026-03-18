import { toast } from 'sonner';

interface Usuario {
  id?: string | number;
  name?: string;
  nombre?: string;
  email: string;
  role?: string;
  isAdmin?: boolean;
  [key: string]: unknown;
}

// PATCH
async function patchUsuarios(usuario: Partial<Usuario>, id: string | number) {
  try {
    const respuesta = await fetch('http://localhost:3001/usuarios/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }

    const datosUsuarios = await respuesta.json();
    return datosUsuarios;
  } catch (error) {
    console.error('Error al actualizar los cambios', error);
    toast.error('Error al actualizar los cambios del usuario');
  }
}

// DELETE
async function deleteUsuarios(id: string | number) {
  try {
    const respuesta = await fetch('http://localhost:3001/usuarios/' + id, {
      method: 'DELETE',
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error al Eliminar el registro', error);
    toast.error('Error al eliminar el usuario');
  }
}

// GET
async function getUser() {
  try {
    const respuesta = await fetch('http://localhost:3001/usuarios');
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener los usuarios', error);
    toast.error('Error de conexión al obtener usuarios');
  }
}

// POST
async function postUser(usuario: Omit<Usuario, 'id'>) {
  try {
    const respuesta = await fetch('http://localhost:3001/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al registrar el usuario', error);
    toast.error('Error al registrar el usuario');
  }
}

export default { patchUsuarios, deleteUsuarios, getUser, postUser };
