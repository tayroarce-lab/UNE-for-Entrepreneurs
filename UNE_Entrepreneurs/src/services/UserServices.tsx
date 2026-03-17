import type { User } from '../types/user';

//PATCH
async function patchUsuarios(usuario: Partial<User>, id: string | number): Promise<User | undefined> {
  try {
    const respuesta = await fetch("http://localhost:3001/usuarios/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    })

    const datosUsuarios = await respuesta.json();
    return datosUsuarios;
  } catch (error) {
    console.error("Error al actualizar los cambios", error);
  }
}

//DELETE
async function deleteUsuarios(id: string | number): Promise<any> {
  try {
    const respuesta = await fetch("http://localhost:3001/usuarios/" + id, {
      method: "DELETE",
    })

    const datosUsuarios = await respuesta.json();
    return datosUsuarios;
  } catch (error) {
    console.error("Error al Eliminar el registro", error);
  }
}

async function getUser(): Promise<User[]> {
  try {
    const respuesta = await fetch("http://localhost:3001/usuarios")
    const datos = await respuesta.json();
    return datos || [];
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    return [];
  }
}

async function postUser(usuario: Omit<User, 'id'>): Promise<User | undefined> {
  try {
    const respuesta = await fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    })
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error al registrar el usuario", error);
  }
}

export default { patchUsuarios, deleteUsuarios, getUser, postUser }
