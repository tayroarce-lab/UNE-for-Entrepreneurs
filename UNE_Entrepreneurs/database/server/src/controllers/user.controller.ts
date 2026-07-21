import { Response } from 'express';
import UserService from '../services/user.service';
import { AuthenticatedRequest } from '../middlewares/autenticacion.middleware';

export class UserController {
  public static async register(req: AuthenticatedRequest, res: Response) {
    try {
      const { nombre, email, password, rol, url_foto_perfil } = req.body;
      const newUser = await UserService.register({
        nombre,
        email,
        password,
        rol,
        url_foto_perfil,
      });

      const responseData = {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol,
        url_foto_perfil: newUser.url_foto_perfil,
        createdAt: newUser.createdAt,
      };

      return res.status(201).json({
        mensaje: 'Usuario registrado con éxito.',
        datos: responseData,
      });
    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message || 'Error al registrar el usuario.' });
    }
  }

  public static async login(req: AuthenticatedRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);

      const responseData = {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        url_foto_perfil: user.url_foto_perfil,
      };

      return res.status(200).json({
        mensaje: 'Inicio de sesión exitoso.',
        token,
        usuario: responseData,
      });
    } catch (error: any) {
      return res.status(401).json({ mensaje: error.message || 'Credenciales incorrectas.' });
    }
  }

  public static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ mensaje: 'No autorizado.' });
      }

      const user = await UserService.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }

      return res.status(200).json({ datos: user });
    } catch (error: any) {
      return res.status(500).json({ mensaje: 'Error al obtener el perfil.' });
    }
  }

  public static async getAllUsers(_req: AuthenticatedRequest, res: Response) {
    try {
      const users = await UserService.findAll();
      return res.status(200).json({ datos: users });
    } catch (error: any) {
      return res.status(500).json({ mensaje: 'Error al obtener los usuarios.' });
    }
  }

  public static async update(req: AuthenticatedRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      const updatedUser = await UserService.update(id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }
      return res.status(200).json({ mensaje: 'Usuario actualizado con éxito.', datos: updatedUser });
    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message || 'Error al actualizar usuario.' });
    }
  }

  public static async delete(req: AuthenticatedRequest, res: Response) {
    try {
      const id = Number(req.params.id);
      const success = await UserService.delete(id);
      if (!success) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }
      return res.status(200).json({ mensaje: 'Usuario eliminado con éxito.' });
    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message || 'Error al eliminar usuario.' });
    }
  }
}
export default UserController;
