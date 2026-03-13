// ============================================================
// UserServices: Servicio de usuarios para comunicación con db.json
// Servidor: json-server en http://localhost:3001
// ============================================================

const API_URL = "http://localhost:3001/usuarios";

// GET - Obtener todos los usuarios
async function getUser() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) {
    throw new Error(`Error al obtener usuarios: ${respuesta.status}`);
  }
  const datos = await respuesta.json();
  return datos;
}

// POST - Registrar un nuevo usuario
async function postUser(usuario: any) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });
  if (!respuesta.ok) {
    throw new Error(`Error al registrar usuario: ${respuesta.status}`);
  }
  const datos = await respuesta.json();
  return datos;
}

// PATCH - Actualizar un usuario
async function patchUsuarios(usuario: any, id: string | number) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });
  if (!respuesta.ok) {
    throw new Error(`Error al actualizar usuario: ${respuesta.status}`);
  }
  const datosUsuarios = await respuesta.json();
  return datosUsuarios;
}

// DELETE - Eliminar un usuario
async function deleteUsuarios(id: string | number) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) {
    throw new Error(`Error al eliminar usuario: ${respuesta.status}`);
  }
  const datosUsuarios = await respuesta.json();
  return datosUsuarios;
}

export default { patchUsuarios, deleteUsuarios, getUser, postUser }
